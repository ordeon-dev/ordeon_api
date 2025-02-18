import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UserDtoPersonal {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  
  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
}