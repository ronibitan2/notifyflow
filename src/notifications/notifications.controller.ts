import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { NotificationsService } from './notifications.service.js';


@Controller('notifications')
export class NotificationsController {

    constructor(private readonly  notificationsService: NotificationsService) {}
    
    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.create(dto);
    }

    @Get()
    findAll() {
        return this.notificationsService.findAll();
    }

    
}

