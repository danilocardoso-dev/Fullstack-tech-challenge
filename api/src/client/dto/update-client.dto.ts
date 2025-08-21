// api/src/client/dto/update-client.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: any;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;
}

// api/src/client/dto/update-client.dto.ts
// DTO para atualizar informações de um cliente
// Utiliza validação para garantir que os dados estejam corretos
// Campos opcionais são marcados com @IsOptional