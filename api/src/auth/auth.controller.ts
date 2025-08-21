import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiResponse({ status: 200, description: 'Usuário logado com sucesso, retorna JWT e refresh token' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

@Post('refresh')
@Public()
async refresh(@Body() body: { userId: string, refreshToken: string }) {
  return this.authService.refreshToken(body);
}

  @Post('logout')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout do usuário e invalidação do refresh token' })
  @ApiResponse({ status: 200, description: 'Usuário deslogado com sucesso' })
  async logout(@Body() body: { userId: string }) {
    return this.authService.logout(body.userId);
  }
}''




// api/src/auth/auth.controller.ts
// Controlador de autenticação, define as rotas relacionadas ao login
// Utiliza o AuthService para validar usuários e gerar tokens JWT
// Pode ser estendido com outras rotas como registro, logout, etc.