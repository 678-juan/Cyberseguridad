import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  user_name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  rol: { id: number };
}
