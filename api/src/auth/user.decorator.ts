import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // vem do RolesGuard
  },
);
// api/src/auth/user.decorator.ts
// Decorador para acessar o usuário autenticado na requisição
// Utilizado em controladores para obter os dados do usuário atual
// Exemplo de uso: @CurrentUser() para injetar o usuário autenticado no método do controlador
// Pode ser combinado com guards para garantir que o usuário esteja autenticado antes de acessar o endpoint