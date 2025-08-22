import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService {
    private prisma;
    constructor(prisma: PrismaService);
    createClient(dto: CreateClientDto, tenantId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
        publicId: string;
        contact: string | null;
        address: import("@prisma/client/runtime/library").JsonValue | null;
        imageUrl: string | null;
        isActive: boolean;
    }>;
    findAll(tenantId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
        publicId: string;
        contact: string | null;
        address: import("@prisma/client/runtime/library").JsonValue | null;
        imageUrl: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string, tenantId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        tenantId: string;
        publicId: string;
        contact: string | null;
        address: import("@prisma/client/runtime/library").JsonValue | null;
        imageUrl: string | null;
        isActive: boolean;
    } | null>;
    update(id: string, dto: UpdateClientDto, tenantId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: string, tenantId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getKpis(tenantId: string): Promise<{
        total: number;
        ativos: number;
    }>;
}
