import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { NotificationsService } from './notifications.service.js';


@Controller('notifications')
export class NotificationsController {

    constructor(private readonly  notificationsService: NotificationsService) {}
    
    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.create(dto);
    }
}

