import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterUserDTO } from 'src/models/dto/user/register-user.dto';
import { UserDTO } from 'src/models/dto/user/user.dto';
import { CreateEmployeeDTO } from '../models/dto/employee/create-employee.dto';
import { EmployeeDTO } from 'src/models/dto/employee/employee.dto';
import { SkillDTO } from 'src/models/dto/skill/skill.dto';
import { CreateSkillDTO } from '../models/dto/skill/create-skill.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

@Post('/register')
public async registerUser(@Body(new ValidationPipe({ transform: true, whitelist: true })) registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
    return this.adminService.registerUser(registerUserDTO);    
}
@Post('/hire')
public async createEmployee(@Body(new ValidationPipe({ transform: true, whitelist: true })) createEmployeeDTO: CreateEmployeeDTO): Promise<EmployeeDTO> {
    return this.adminService.createEmployee(createEmployeeDTO);    
}

@Post('/skill/create')
public async addNewSkillToCatalog(@Body(new ValidationPipe({ transform: true, whitelist: true })) createSkillDTO: CreateSkillDTO): Promise<SkillDTO> {
    return this.adminService.addNewSkillToCatalog(createSkillDTO);
}
}
