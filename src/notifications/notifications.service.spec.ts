import { NotificationsService } from './notifications.service.js';

describe('NotificationsService', () => {
  it('should store a created notification', () => {
    const service = new NotificationsService();
    const notification = service.create({
        recipient:'test@example.com',
        subject: 'Welcome to NotifyFlow',
        message: 'Your account is ready.'       
    })
    expect(service.findAll()).toEqual([notification]);
  });
});