import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // melhor colocar no .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, RolesGuard], // exporta AuthService e JwtModule para uso em outros módulos
})
export class AuthModule {}

// api/src/auth/auth.module.ts
// Módulo de autenticação, importa o PrismaModule para acessar o banco de dados
// Registra o AuthService e AuthController
// Configura o JwtModule com uma chave secreta e opções de expiração do token
// Pode ser estendido com mais serviços ou controladores relacionados à autenticação