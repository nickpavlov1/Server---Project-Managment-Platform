import { Controller, Post, Body, ValidationPipe, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterUserDTO } from 'src/models/dto/user/register-user.dto';
import { UserDTO } from 'src/models/dto/user/user.dto';
import { CreateEmployeeDTO } from '../models/dto/employee/create-employee.dto';
import { EmployeeDTO } from 'src/models/dto/employee/employee.dto';
import { SkillDTO } from 'src/models/dto/skill/skill.dto';
import { CreateSkillDTO } from '../models/dto/skill/create-skill.dto';
import { EditUserDTO } from '../models/dto/user/edit-user.dto';
import { EditEmployeeDTO } from 'src/models/dto/employee/edit-employee.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

@Post('/register')
public async registerUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    registerUserDTO: RegisterUserDTO
    ): Promise<UserDTO> {
        return this.adminService.registerUser(registerUserDTO);    
}
@Post('/hire')
public async createEmployee(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createEmployeeDTO: CreateEmployeeDTO
    ): Promise<EmployeeDTO> {
        return this.adminService.createEmployee(createEmployeeDTO);    
}

@Post('/skill/create')
public async addNewSkillToCatalog(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createSkillDTO: CreateSkillDTO
    ): Promise<SkillDTO> {
        return this.adminService.addNewSkillToCatalog(createSkillDTO);
}

@Put('/change/position')
public async changeUserWorkPosition(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    userId: string
    ): Promise<UserDTO>  {
        return this.adminService.changeUserWorkPosition(userId);
}

@Put('/change/user/:id')
public async changeUserProfileInfo(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editUserInfo: EditUserDTO
    ): Promise<UserDTO> {
        return this.adminService.changeUserProfileInfo(id, editUserInfo);
}

@Put('/change/employee/:id')
public async changeEmployeeProfileInfo(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editEmployeeInfo: EditEmployeeDTO
    ): Promise<EmployeeDTO> {
        return this.adminService.changeEmployeeProfileInfo(id, editEmployeeInfo);
}
@Put('/change/user/manager/:id')
public async changeUserManager(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editUserInfo: EditUserDTO
    ): Promise<UserDTO> {
        return this.adminService.changeUserManager(id, editUserInfo);
}

}
