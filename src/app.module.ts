import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { NotificationsController } from './notifications/notifications.controller.js';


@Module({
  imports: [],
  controllers: [AppController, NotificationsController],
  providers: [AppService],
})
export class AppModule {}
