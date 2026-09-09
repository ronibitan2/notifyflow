import { Injectable } from '@nestjs/common';
import type { Notification } from './notification.js';
import type { CreateNotificationDto } from './dto/create-notification.dto.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class NotificationsService {
    private readonly notifications: Notification[] = [];
    create(dto: CreateNotificationDto): Notification {
        const notification: Notification = {
            id: randomUUID(),
            recipient: dto.recipient,
            subject: dto.subject,
            message: dto.message,
            status: 'pending',
            createdAt: new Date()
        };

        this.notifications.push(notification);

        return notification;
    }

    findAll(): Notification[] {
        return [...this.notifications];
    }
    
}