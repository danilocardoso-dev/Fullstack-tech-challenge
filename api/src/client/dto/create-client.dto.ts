// api/src/client/dto/create-client.dto.ts
import { IsEmail, IsOptional, IsString, isNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  publicId?: string; // Pode ser gerado no service caso não venha no body

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contact?: string;

  @ApiPropertyOptional({ description: 'Address as JSON (street, neighborhood, number, state)' })
  @IsOptional()
  address?: any; // address é Json no Prisma; aceitar any aqui

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;
}


// api/src/client/dto/create-client.dto.ts
// DTO para criar um cliente
// Utiliza validação para garantir que os dados estejam corretos
// Campos opcionais são marcados com @IsOptional
// @ApiProperty é usado para documentar os campos na Swagger UI