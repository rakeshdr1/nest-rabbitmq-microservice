import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersRepository } from './order.repository';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
