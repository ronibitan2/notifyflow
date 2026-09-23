import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { NotificationsController } from './notifications/notifications.controller.js';
import { NotificationsService } from './notifications/notifications.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationEntity,
  NotificationSchema,
} from './notifications/notification.schema.js';


@Module({
  imports: [
   MongooseModule.forRoot(
    process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/notifyflow',
  ), 
    MongooseModule.forFeature([
      { name: NotificationEntity.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [AppController, NotificationsController],
  providers: [AppService, NotificationsService],
})
export class AppModule {}
