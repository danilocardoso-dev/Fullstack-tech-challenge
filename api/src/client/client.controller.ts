import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards, Patch
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RoleEnum } from 'src/auth/enums/role.enum';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  create(@Body() dto: CreateClientDto, @Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.createClient(dto, tenantId);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.GUEST)
  findAll(@Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.findAll(tenantId);
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.GUEST)
  findOne(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.findOne(id, tenantId);
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  update(@Param('id') id: string, @Body() dto: UpdateClientDto, @Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.update(id, dto, tenantId);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string, @Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.remove(id, tenantId);
  }

  @Get('kpis')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async getKpis(@Req() req: any) {
    const tenantId = req.user.tenantId;
    return this.clientService.getKpis(tenantId);
  }

  @Patch(':id/status')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
    @Req() req: any,
  ) {
    const tenantId = req.user.tenantId;
    return this.clientService.update(id, { isActive: body.isActive }, tenantId);
  }
}
