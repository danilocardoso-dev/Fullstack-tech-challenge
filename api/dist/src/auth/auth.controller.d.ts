import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: string;
    }>;
    refresh(body: {
        userId: string;
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
    logout(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
