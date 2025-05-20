import { BadRequestException, Injectable } from '@nestjs/common';
import { Menu } from 'src/menu/entities/menu.entity';
import User from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Logger } from 'nestjs-pino';
interface subTotal {
    subTotal : string
}

@Injectable()
export class CartService {
  constructor(private dataSource: DataSource, private readonly logger: Logger) {}
  /**
   * kosárba rakás és ha többször nyom rá akkor hozzáad egyet a quantity-hez
   * @param createCartDto A kosár létrehozásához szükséges adatok
   * @param user 
   * @throws BadRequestException("az étel nem található") ha esetleg sikerülne olyan id-t küldeni ami nincs is az étlapon
   */
  async create(createCartDto: CreateCartDto, user : User) {
    const cartRepo = this.dataSource.getRepository(Cart);
    const menuRepo = this.dataSource.getRepository(Menu)
    const MenuItemExist =  await menuRepo.findOne({where: { food_id : createCartDto.menuItem.food_id}});
    if( createCartDto.menuItem.food_id == undefined ||MenuItemExist == null) {
      this.logger.warn(`A(z) ${user.email} felhasználó nem létező ételt próbált hozzáadni (ID: ${createCartDto.menuItem.food_id})`);
      throw new BadRequestException("az étel nem található")
    }
    const AlreadyInTheCart = await cartRepo.findOne({where: {user : user, menuItem : createCartDto.menuItem}, relations : {user : true, menuItem : true}});
    if(AlreadyInTheCart) {
      AlreadyInTheCart.quantity += createCartDto.quantity
      AlreadyInTheCart.total = AlreadyInTheCart.menuItem.food_price * AlreadyInTheCart.quantity
        this.logger.log(
        `A(z) ${user.email} felhasználó növelte a(z) ${AlreadyInTheCart.menuItem.food_name} Id: {${AlreadyInTheCart.menuItem.food_id}} étel mennyiségét ${AlreadyInTheCart.quantity} darabra.`,
      );
      await cartRepo.save(AlreadyInTheCart)
      return;
    }
    const newCartItem = new Cart()
    newCartItem.menuItem = createCartDto.menuItem
    newCartItem.quantity = createCartDto.quantity 
    newCartItem.total = newCartItem.quantity * newCartItem.menuItem.food_price
    newCartItem.user = user;
        this.logger.log(
      `A(z) ${user.email} felhasználó hozzáadta a(z)${newCartItem.menuItem.food_name} Id: {${newCartItem.menuItem.food_id}} ételt a kosarához (${newCartItem.quantity} darab).`,
    );

    cartRepo.save(newCartItem)

  }

  /**
   * A usernek az aktuális kosarát adja vissza egy végösszeggel
   * @param user 
   * @returns kosárban lévő itemek és sumTotal végösszegnek
   */
  async getCartItems(user : User) {
    const cartRepo = this.dataSource.getRepository(Cart);
    let sumTotalQuerry  =  await cartRepo.createQueryBuilder('cart').select('SUM(total) as subTotal') 
    .where('userId = :userId', {userId : user.id}).getRawOne() as subTotal
    const sumTotal = sumTotalQuerry.subTotal;
    
    this.logger.log(`A(z) ${user.email} felhasználó lekérte a kosara tartalmát.`);
    
    return {shoppingCart : await cartRepo.find({where :{user}, relations : {menuItem : true}}), sumTotal}
  }


  /**
   * A mennyiség növelése, csökkentése
   * @param updateCartDto a kosár modosításához szükséges adatok
   * @param user 
   */
  async update(updateCartDto : UpdateCartDto, user : User) {
    const cartRepo = this.dataSource.getRepository(Cart)
    const cartItemToUpdate = await cartRepo.findOne({where: {user : user, menuItem : updateCartDto.menuItem}, relations : {user : true, menuItem : true}})
    if (!cartItemToUpdate) {
      this.logger.warn(
        `A(z) ${user.email} felhasználó olyan ételt próbált módosítani, ami nincs a kosarában (ID: ${updateCartDto.menuItem.food_id})`,
      );
      throw new BadRequestException('Ez az étel nincs a kosaradban');
    }
    cartItemToUpdate.quantity = updateCartDto.quantity
    cartItemToUpdate.total = updateCartDto.quantity * updateCartDto.menuItem.food_price
    cartRepo.save(cartItemToUpdate)
  }
  /**
   * A kosárban lévő ételek törlése
   * @param id a törlése szánt étel 
   * @param user 
   */
  async remove(id: string, user : User) {
    const cartRepo = this.dataSource.getRepository(Cart)
    const cartItemExist = await cartRepo.findOne({where : {id, user}, relations : {user : true}})
    if(cartItemExist == null) {
      this.logger.warn(`A(z) ${user.email} felhasználó olyan ételt próbált törölni a kosarából, ami nem létezik (id: ${id})`);
      throw new BadRequestException("Az étel nincs a kosaradban")
    }
    this.logger.log(`A(z) ${user.email} felhasználó törölte a(z) ${id} azonosítójú ételt a kosarából.`);
    await cartRepo.delete({id : id});
  }
}
