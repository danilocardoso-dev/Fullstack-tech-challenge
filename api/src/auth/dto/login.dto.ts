import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}


// api/src/auth/dto/login.dto.ts
// DTO para o login, define os campos esperados na requisição de login
// Pode ser estendido com validações usando class-validator se necessário