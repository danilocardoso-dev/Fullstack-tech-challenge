import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(dto: CreateClientDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdateClientDto, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    remove(id: string, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getKpis(req: any): Promise<{
        total: number;
        ativos: number;
    }>;
    updateStatus(id: string, body: {
        isActive: boolean;
    }, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
