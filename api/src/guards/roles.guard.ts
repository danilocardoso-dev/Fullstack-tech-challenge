import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../auth/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../auth/public.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    console.log("🔎 Authorization Header recebido:", authHeader);

    if (!authHeader) throw new ForbiddenException('Token não fornecido');

    const token = authHeader.split(' ')[1];
    if (!token) throw new ForbiddenException('Token inválido');

    let payload: any;
    try {
      payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secretKey' });
    } catch (err) {
      console.log("❌ Erro ao verificar token:", err.message);
      throw new ForbiddenException('Token inválido ou expirado');
    }

    console.log("✅ Payload do token decodificado:", payload);
    request.user = payload;

    if (!requiredRoles) return true;

    console.log("📌 Roles exigidas:", requiredRoles);
    console.log("👤 Role do usuário:", payload.role);

    if (!requiredRoles.includes(payload.role)) {
      throw new ForbiddenException('Acesso negado: role insuficiente');
    }

    return true;
  }
}


// api/src/auth/roles.guard.ts
// Guard para controle de acesso baseado em papéis (RBAC)
// Verifica se o usuário tem a role necessária para acessar o endpoint