import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'node:crypto';

@Schema()
export class NotificationEntity {
    @Prop({ type: String, required: true })
    recipient: string;
    @Prop({ type: String, required: true })
    subject: string;
    @Prop({ type: String, required: true })
    message: string;
    @Prop({ type: String, enum: ['pending'], default: 'pending', required: true })
    status: 'pending';
    @Prop({ type: Date, default: Date.now, required: true })
    createdAt: Date;
    @Prop({ type: String, required: true, unique: true, default: randomUUID })
    id: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationEntity);

