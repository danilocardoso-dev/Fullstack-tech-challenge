import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto} from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../auth/enums/role.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto, tenantId: string) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        tenant: { connect: { id: tenantId } }, // garante que o user pertence ao tenant
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto, tenantId: string) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const updated = await this.prisma.user.updateMany({
      where: { id, tenantId },
      data: { ...dto },
    });
    if (updated.count === 0) throw new NotFoundException('Usuário não encontrado ou não pertence ao seu tenant');
    return updated;
  }

  async remove(id: string, tenantId: string) {
    const deleted = await this.prisma.user.deleteMany({
      where: { id, tenantId },
    });
    if (deleted.count === 0) throw new NotFoundException('Usuário não encontrado ou não pertence ao seu tenant');
    return { message: 'Usuário removido com sucesso' };
  }
}
