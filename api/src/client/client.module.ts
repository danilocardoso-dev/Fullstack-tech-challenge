// src/client/client.module.ts
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [AuthModule], // Importa AuthModule para usar AuthService e decorators
  controllers: [ClientController],
  providers: [ClientService, PrismaService, RolesGuard],
  exports: [ClientService],
})
export class ClientModule {}
