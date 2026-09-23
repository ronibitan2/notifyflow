import { Injectable } from '@nestjs/common';
import type { Notification } from './notification.js';
import type { CreateNotificationDto } from './dto/create-notification.dto.js';
import { randomUUID } from 'node:crypto';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { NotificationEntity } from './notification.schema.js';

@Injectable()
export class NotificationsService {
    async create(dto: CreateNotificationDto): Promise<Notification> {
        const notification: Notification = {
            id: randomUUID(),
            recipient: dto.recipient,
            subject: dto.subject,
            message: dto.message,
            status: 'pending',
            createdAt: new Date()
        };

        await this.notificationModel.create(notification);

        return notification;
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel
        .find({}, { _id: 0, __v: 0 })
        .lean()
        .exec();
    }

    async findOne(id: string): Promise<Notification | null> {
        return this.notificationModel.
        findOne({ id }, { _id: 0, __v: 0 })
        .lean()
        .exec();

    }
    
    constructor(
        @InjectModel(NotificationEntity.name)
        private readonly notificationModel: Model<NotificationEntity>,
    ) {}
    
}
