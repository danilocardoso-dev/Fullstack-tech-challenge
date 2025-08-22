"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../auth/public.decorator");
const jwt_1 = require("@nestjs/jwt");
let RolesGuard = class RolesGuard {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        console.log("🔎 Authorization Header recebido:", authHeader);
        if (!authHeader)
            throw new common_1.ForbiddenException('Token não fornecido');
        const token = authHeader.split(' ')[1];
        if (!token)
            throw new common_1.ForbiddenException('Token inválido');
        let payload;
        try {
            payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secretKey' });
        }
        catch (err) {
            console.log("❌ Erro ao verificar token:", err.message);
            throw new common_1.ForbiddenException('Token inválido ou expirado');
        }
        console.log("✅ Payload do token decodificado:", payload);
        request.user = payload;
        if (!requiredRoles)
            return true;
        console.log("📌 Roles exigidas:", requiredRoles);
        console.log("👤 Role do usuário:", payload.role);
        if (!requiredRoles.includes(payload.role)) {
            throw new common_1.ForbiddenException('Acesso negado: role insuficiente');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_1.JwtService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map