import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
// api/src/auth/roles.decorator.ts
// Decorador para definir os papéis (roles) necessários para acessar um endpoint
// Utilizado em conjunto com guards para implementar controle de acesso baseado em papéis (RBAC)
// Pode ser aplicado a controladores ou métodos específicos
// Exemplo de uso: @Roles('admin', 'user') para permitir acesso apenas a usuários com esses papéis