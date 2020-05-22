import { Controller, Post, Body, ValidationPipe, Delete, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Token } from "src/common/decorators/token.decorator";
import { LoginUserDTO } from "src/models/dto/user/login-user.dto";
import { AuthGuardWithBlacklisting } from "src/common/guards/blacklist.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public login(@Body(new ValidationPipe({ transform: true, whitelist: true })) loginUserDTO: LoginUserDTO): Promise<{ accessToken: string }> {
        return this.authService.login(loginUserDTO);
    }
    @Delete('logout')
    @UseGuards(AuthGuardWithBlacklisting)
    public logout(@Token() token: string) {
        
        this.authService.blacklistToken(token);

        return {
          msg: 'Successful logout!',
        };
    }
}