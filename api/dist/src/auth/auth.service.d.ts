import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        refreshToken: string | null;
        tenantId: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: string;
    }>;
    refreshToken({ userId, refreshToken }: {
        userId: string;
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
