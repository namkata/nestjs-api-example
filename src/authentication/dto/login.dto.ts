import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
export class LogInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string;
}

export default LogInDto;
