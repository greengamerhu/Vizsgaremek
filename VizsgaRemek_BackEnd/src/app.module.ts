import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UsersModule } from './users/users.module';
import { UserAdressModule } from './user_adress/user_adress.module';
import { UserAddress } from './user_adress/entities/user_adress.entity';
import { MenuModule } from './menu/menu.module';
import User from './users/entities/user.entity';
import { Menu } from './menu/entities/menu.entity';
import { AuthModule } from './auth/auth.module';
import Token from './auth/token.entity';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { OrderItems } from './order/entities/orderItems.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { LoggerModule } from 'nestjs-pino/LoggerModule';

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + process.env.NODE_ENV)

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
        name: 'dev version',
        // install 'pino-pretty' package in order to use the following option
        transport: process.env.NODE_ENV !== 'prod'
          ? { target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname,req',
            },
          }
          :
          {
                target: '@autotelic/pino-seq-transport',
                options: {
                  loggerOpts: {
                    serverUrl: process.env.SEQ_SERVER_URL
                  }
                }
              }
        // transport: {
        //   targets: [
        //     {
        //       target: 'pino/file',
        //       options: { destination: 'logs/app.log', mkdir: true },

        //   //      target: 'pino-pretty',
        //   // options: {
        //   //   colorize: true,
        //   //   translateTime: 'yyyy-mm-dd HH:MM:ss',
        //   //   ignore: 'pid,hostname',
        //   // },
        //     },
        //   ],
        // },

      },

    }),
  
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'database',
      entities: [
        User, UserAddress, Menu, Token, Cart, Order, OrderItems
        /* List of entities here */
      ],
      synchronize: true,

    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),

    UsersModule,
    UserAdressModule,
    MenuModule,
    AuthModule,
    PassportModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
