import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto} from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../auth/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  create(@Body() dto: CreateUserDto, @Req() req: any) {
    return this.userService.createUser(dto, req.user.tenantId);
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: any) {
    return this.userService.updateUser(id, dto, req.user.tenantId);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  findAll(@Req() req: any) {
    return this.userService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.userService.findOne(id, req.user.tenantId);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.userService.remove(id, req.user.tenantId);
  }
}
