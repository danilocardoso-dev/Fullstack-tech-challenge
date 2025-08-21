// api/src/user/dto/update-user.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class UpdateUserDto {
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
  password?: string;

  @ApiPropertyOptional({ enum: RoleEnum })
  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  tenantId?: string;
}
