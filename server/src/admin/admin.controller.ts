import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterUserDTO } from 'src/models/dto/user/register-user.dto';
import { UserDTO } from 'src/models/dto/user/user.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('/register')
public async register(@Body(new ValidationPipe({ transform: true, whitelist: true })) registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
    return this.adminService.registerUser(registerUserDTO);    
}
}
