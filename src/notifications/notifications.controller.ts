import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
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

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const notification = await this.notificationsService.findOne(id);
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        return notification;
    }

    
}

