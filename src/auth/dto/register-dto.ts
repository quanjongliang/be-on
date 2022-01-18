import { IsEmail, IsOptional } from 'class-validator';

export class RegisterUserDto {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  keepLogin = false;
  @IsEmail({}, { message: 'Email is invalid' })
  @IsOptional()
  email?: string;
}
