import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RolesGuard } from './guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  // Guard global
  app.useGlobalGuards(new RolesGuard(reflector, jwtService));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Desafio Técnico - API')
    .setDescription('API com autenticação, RBAC e multi-tenant')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token') // JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger em http://localhost:3000/api
  console.log('Aplicação rodando em http://localhost:3000');

  // Configuração do CORS
  app.enableCors({
    origin: '*', // Permite todas as origens, ajustar conforme necessário
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
    await app.listen(3000);
  console.log('Servidor iniciado na porta 3000');

  // Configuração do prefixo de rota
  app.setGlobalPrefix('api'); // Todas as rotas terão o prefixo /api
  console.log('Prefixo global configurado para /api');
}
bootstrap();

// api/src/main.ts
// Ponto de entrada da aplicação NestJS
// Configura o módulo principal e inicializa o servidor na porta 3000
// Registra o RolesGuard globalmente para controle de acesso baseado em papéis (RBAC)
// Pode ser estendido com middlewares, pipes, interceptors, etc.