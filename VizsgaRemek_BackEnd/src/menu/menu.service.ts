import { Injectable } from '@nestjs/common';
import { Menu } from 'src/menu/entities/menu.entity'
import { DataSource } from 'typeorm';
import  CreateMenuDto  from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Logger } from 'nestjs-pino';
import User from 'src/users/entities/user.entity';

@Injectable()
export class MenuService {
  constructor(private dataSource: DataSource, private readonly logger: Logger) {
    
  }
  
  /**
   * Étel hozzáadása a menühöz, az asztali alkalmazással
   * @param createMenuDto Az étel adatai
   */
  async create(createMenuDto: CreateMenuDto, user : User) {
    const menuItem = Object.assign(new Menu(), createMenuDto)
    this.logger.log(`${user.email} : ${user.role} hozzáadta az ételt a menühöz ${menuItem.food_name} ${menuItem}`)
    
    await this.dataSource.getRepository(Menu).save(menuItem)
  }
  /**
   * A menü lekérdezése az összes app számára
   * @returns egy menü lista
   */
  async findAll() {
    this.logger.log(`Lekérték a menüt`)

   return {menu : await this.dataSource.getRepository(Menu).find()};
  }

/**
 * Az étel modósítása az asztali alkalmazás miatt
 * @param id Az étel idja
 * @param updateMenuDto a Modosítandó étel listája
 */
  async update(id: number, updateMenuDto: UpdateMenuDto, user : User) {
    const menuRepo = this.dataSource.getRepository(Menu)
    const menuItemToUpdate = await menuRepo.findOneBy({food_id : id})
    menuItemToUpdate.food_name = updateMenuDto.food_name
    menuItemToUpdate.food_description = updateMenuDto.food_description
    menuItemToUpdate.food_price = updateMenuDto.food_price
    menuItemToUpdate.food_category = updateMenuDto.food_category
    menuItemToUpdate.food_image = updateMenuDto.food_image
    this.logger.log(`${user.email} : ${user.role} Megváltoztatta a ${menuItemToUpdate.food_id}-nak a  értékeit  erre:${updateMenuDto}`)

    await menuRepo.save(menuItemToUpdate)
  }
  /**
   * az étel törlése szintén az asztali alkalmazásnak 
   */
  async remove(id: number, user : User) {
    this.logger.log(`${user.email} : ${user.role} törölte a ${id} Azonsítójú ételt`)

    await this.dataSource.getRepository(Menu).delete(id);
  }
}
