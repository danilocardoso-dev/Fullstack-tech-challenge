import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto, tenantId: string): Promise<{
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
    findAll(tenantId: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string;
    }>;
    updateUser(id: string, dto: UpdateUserDto, tenantId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: string, tenantId: string): Promise<{
        message: string;
    }>;
}
