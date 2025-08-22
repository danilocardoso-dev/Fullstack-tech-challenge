import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUserDto, req: any): Promise<{
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
    update(id: string, dto: UpdateUserDto, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    findAll(req: any): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string;
    }[]>;
    findOne(id: string, req: any): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        tenantId: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
