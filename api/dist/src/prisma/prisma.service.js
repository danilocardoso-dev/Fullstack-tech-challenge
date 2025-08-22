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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
        this.$extends({
            model: {
                user: {
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
                client: {
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map