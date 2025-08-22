"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Senha inválida');
        return user;
    }
    async register(createUserDto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });
        if (existingUser)
            throw new common_1.ConflictException('Email já cadastrado');
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
                role: createUserDto.role,
                tenantId: createUserDto.tenantId,
            },
        });
        return { message: 'Usuário cadastrado com sucesso', userId: user.id };
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ sub: user.id }, { secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret', expiresIn: '7d' });
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefreshToken },
        });
        return { accessToken, refreshToken, userId: user.id };
    }
    async refreshToken({ userId, refreshToken }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user || !user.refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token inválido');
            }
            const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
            if (!tokenMatches)
                throw new common_1.UnauthorizedException('Refresh token inválido');
            const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId }, { expiresIn: '15m' });
            return { accessToken: newAccessToken };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Refresh token inválido ou expirado');
        }
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return { message: 'Usuário deslogado com sucesso' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map