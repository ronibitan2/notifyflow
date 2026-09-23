import { NotificationsService } from './notifications.service.js';

describe('NotificationsService', () => {
  it('should store a created notification', () => {
    const service = new NotificationsService();
    const notification = service.create({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'       
    });
    expect(service.findAll()).toEqual([notification]);
  });

  it('should find a notification by id', () => {
    const service = new NotificationsService();
    const notification = service.create({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'       
    });
    expect(service.findOne(notification.id)).toEqual(notification);
  });

  it('should return undefined for an unknown id', () => {
    const service = new NotificationsService();
    expect(service.findOne('unknown-id')).toBeUndefined();
  });

});