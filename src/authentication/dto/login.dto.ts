import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class LogInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LogInDto;
