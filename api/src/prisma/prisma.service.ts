// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    // Middleware moderno para multi-tenant usando $extends
    this.$extends({
      model: {
        user: { // <-- deve ser minúsculo
          async $allOperations({ args, runOriginal, action }) {
            if (['findMany', 'findFirst', 'findUnique'].includes(action)) {
              if (args?.where && args.where['tenantId'] === undefined) {
                throw new Error('TenantId não informado para User!');
              }
            }
            if (['create', 'update', 'delete'].includes(action)) {
              if (args?.data && args.data['tenantId'] === undefined) {
                throw new Error('TenantId não informado no create/update/delete de User!');
              }
            }
            return runOriginal(args);
          },
        },
        client: { // <-- também minúsculo
          async $allOperations({ args, runOriginal, action }) {
            if (['findMany', 'findFirst', 'findUnique'].includes(action)) {
              if (args?.where && args.where['tenantId'] === undefined) {
                throw new Error('TenantId não informado para Client!');
              }
            }
            if (['create', 'update', 'delete'].includes(action)) {
              if (args?.data && args.data['tenantId'] === undefined) {
                throw new Error('TenantId não informado no create/update/delete de Client!');
              }
            }
            return runOriginal(args);
          },
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Conectado ao banco de dados com middleware multi-tenant moderno!');
  }
}
