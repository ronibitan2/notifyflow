import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateNotificationDto {
    @IsEmail()
    recipient: string;
    @IsString()
    @IsNotEmpty()
    subject: string;
    @IsString()
    @IsNotEmpty()
    message: string;
}