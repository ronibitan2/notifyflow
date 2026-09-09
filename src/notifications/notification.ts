export interface Notification {
  id: string;
  recipient: string;
  subject: string;
  message: string;
  status: 'pending';
  createdAt: Date;
}