import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';            
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Valida o usuário pelo login
  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida');

    return user;
  }

  // Cadastro de usuário
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });
    if (existingUser) throw new ConflictException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
        tenantId: createUserDto.tenantId,
      },
    });

    return { message: 'Usuário cadastrado com sucesso', userId: user.id };
  }

  // Login
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret', expiresIn: '7d' },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return { accessToken, refreshToken,userId: user.id };
  }

 // Refresh token
async refreshToken({ userId, refreshToken }: { userId: string, refreshToken: string }) {
  try {
    // Busca o usuário pelo userId
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Verifica se o token bate com o hash no banco
    const tokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!tokenMatches) throw new UnauthorizedException('Refresh token inválido');

    // Gera novo access token
    const newAccessToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
      { expiresIn: '15m' },
    );

    return { accessToken: newAccessToken };
  } catch (err) {
    throw new UnauthorizedException('Refresh token inválido ou expirado');
  }
}


  // Logout
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null }, // remove o refresh token
    });

    return { message: 'Usuário deslogado com sucesso' };
  }
}



// api/src/auth/auth.service.ts
// Serviço de autenticação, responsável por validar usuários e gerar tokens JWT
// Utiliza o PrismaService para acessar o banco de dados e o JwtService para criar tokens
// Pode ser estendido com mais métodos relacionados à autenticação, como registro de usuários, redefinição de senha, etc.