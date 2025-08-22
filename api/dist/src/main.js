"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("./guards/roles.guard");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const reflector = app.get(core_1.Reflector);
    const jwtService = app.get(jwt_1.JwtService);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(reflector, jwtService));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Desafio Técnico - API')
        .setDescription('API com autenticação, RBAC e multi-tenant')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    console.log('Aplicação rodando em http://localhost:3000');
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    await app.listen(3000);
    console.log('Servidor iniciado na porta 3000');
    app.setGlobalPrefix('api');
    console.log('Prefixo global configurado para /api');
}
bootstrap();
//# sourceMappingURL=main.js.map