import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// api/src/auth/public.decorator.ts
// Decorador para marcar rotas como públicas, ou seja, que não requerem autenticação
// Utilizado em conjunto com guards para ignorar a verificação de autenticação
// Pode ser aplicado a controladores ou métodos específicos
// Exemplo de uso: @Public() para permitir acesso sem autenticação