import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as crypto from 'crypto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: CreateClientDto, tenantId: string) {
    return this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
        contact: dto.contact,
        address: dto.address,
        imageUrl: dto.imageUrl,
        isActive: dto.isActive ?? true,
        publicId: dto.publicId ?? crypto.randomUUID(),
        tenant: { connect: { id: tenantId } }, // 🔑 relação obrigatória
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.client.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.client.findFirst({
      where: { id, tenantId },
    });
  }

  async update(id: string, dto: UpdateClientDto, tenantId: string) {
    return this.prisma.client.updateMany({
      where: { id, tenantId },
      data: { ...dto },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.client.deleteMany({
      where: { id, tenantId },
    });
  }

  async getKpis(tenantId: string) {
    const total = await this.prisma.client.count({ where: { tenantId } });
    const ativos = await this.prisma.client.count({ where: { tenantId, isActive: true } });
    return { total, ativos };
  }
}
