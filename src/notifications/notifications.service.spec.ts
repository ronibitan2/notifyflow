import { NotificationsService } from './notifications.service.js';
import { vi } from 'vitest';
import type { Model } from 'mongoose';
import type { NotificationEntity } from './notification.schema.js';

describe('NotificationsService', () => {
  it('should store a created notification', async () => {
    const modelMock = {
      create: vi.fn().mockResolvedValue(undefined),
    };
    const service = new NotificationsService( modelMock as unknown as Model<NotificationEntity>,);
    const notification = await service.create({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'       
    });
    expect(modelMock.create).toHaveBeenCalledWith(notification);
  });

  it('should find a notification by id', async () => {
    const notification = {
        id: 'test-id',
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.',
        status: 'pending',
        createdAt: new Date(),
    };
    const execMock = vi.fn().mockResolvedValue(notification);
    const modelMock = {
      findOne: vi.fn().mockReturnValue({
        lean: vi.fn().mockReturnValue({
          exec: execMock,
        }),
      }),
    };
    const service = new NotificationsService( 
      modelMock as unknown as Model<NotificationEntity>,
    );
    const result = await service.findOne(notification.id);
    expect(result).toEqual(notification);
    expect(modelMock.findOne).toHaveBeenCalledWith(
      { id: notification.id },
      { _id: 0, __v: 0 },
    );
  });

  it('should return null for an unknown id', async () => {
    const execMock = vi.fn().mockResolvedValue(null);
    const modelMock = {
      findOne: vi.fn().mockReturnValue({
        lean: vi.fn().mockReturnValue({
          exec: execMock,
        }),
      }),
    };
    const service = new NotificationsService(
      modelMock as unknown as Model<NotificationEntity>,
    );
    const result = await service.findOne('unknown-id');
    expect(result).toBeNull();
  });

});