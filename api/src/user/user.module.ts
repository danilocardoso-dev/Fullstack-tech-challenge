// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/guards/roles.guard';


@Module({
  imports: [AuthModule], // Importa AuthModule para usar AuthService e decorators
  controllers: [UsersController],
  providers: [UserService, PrismaService, RolesGuard],
  exports: [UserService],
})
export class UserModule {}
