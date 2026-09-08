import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto.js';

@Controller('notifications')
export class NotificationsController {

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return dto;
    }
}

