import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterUserDTO } from 'src/models/dto/user/register-user.dto';
import { UserDTO } from 'src/models/dto/user/user.dto';
import { CreateEmployeeDTO } from '../models/dto/employee/create-employee.dto';
import { EmployeeDTO } from 'src/models/dto/employee/employee.dto';
import { SkillDTO } from 'src/models/dto/skill/skill.dto';
import { EditUserDTO } from '../models/dto/user/edit-user.dto';
import { EditEmployeeDTO } from 'src/models/dto/employee/edit-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Skill } from 'src/database/entities/skill.entity';
import { AddSkillDTO } from 'src/models/dto/skill/add-skill.dto';
import { EditAvatarDTO } from 'src/models/dto/user/edit-avatar.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/register')
  public async registerUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    registerUserDTO: RegisterUserDTO,
  ): Promise<UserDTO> {
    return this.adminService.registerUser(registerUserDTO);
  }
  @Post('/create')
  public async createEmployee(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<EmployeeDTO> {
    return this.adminService.createEmployee(createEmployeeDTO);
  }

  @Post('/skill')
  public async addNewSkillToCatalog(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createSkillDTO: AddSkillDTO,
  ): Promise<SkillDTO> {
    return this.adminService.addNewSkillToCatalog(createSkillDTO);
  }

  @Put('/change/position/:id')
  public async changeUserWorkPosition(
    @Param('id', ParseUUIDPipe)
    userId: string,
  ): Promise<UserDTO> {
    return this.adminService.changeUserWorkPosition(userId);
  }

  @Put('/change/user/:id')
  public async changeUserProfileInfo(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editUserInfo: EditUserDTO,
  ): Promise<UserDTO> {
    return this.adminService.changeUserProfileInfo(id, editUserInfo);
  }

  @Put('/change/employee/:id')
  public async changeEmployeeProfileInfo(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editEmployeeInfo: EditEmployeeDTO,
  ): Promise<EmployeeDTO> {
    return this.adminService.changeEmployeeProfileInfo(id, editEmployeeInfo);
  }

  @Put('/change/user/manager/:id')
  public async changeUserManager(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editUserDTO: EditUserDTO,
  ): Promise<UserDTO> {
    return this.adminService.changeUserManager(id, editUserDTO);
  }

  @Put('/change/employee/manager/:id')
  public async changeEmployeeManager(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    editEmployeeDTO: EditEmployeeDTO,
  ): Promise<EmployeeDTO> {
    return this.adminService.changeEmployeeManager(id, editEmployeeDTO);
  }

  @Put('/:id/skill')
  public async addSkillToEmployeeSkillSet(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    skillSet: string[],
  ): Promise<EmployeeDTO> {
    return this.adminService.addSkillToEmployeeSkillSet(id, skillSet);
  }

  @Post('avatar/user/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadUserPicture(
    @Param('id') userId: string,
    @UploadedFile() file?: any,
    @Body('oldAvatarUrl') oldAvatarUrl?: string,
  ) {
    let userNewProperties: EditAvatarDTO;
    if (file){
    userNewProperties = {
      avatarUrl: `http://localhost:3000/admin/avatar/` + file.filename,
    };
  } else {
    userNewProperties = {
      avatarUrl: `http://localhost:3000/admin/avatar/Profile_Icon.png`,
    };
  }
    if (oldAvatarUrl && oldAvatarUrl !== 'http://localhost:3000/admin/avatar/Profile_Icon.png') {
      this.adminService.deleteFile(oldAvatarUrl.split('/').pop());
    }
    return await this.adminService.updateUserProficePicture(
      userId,
      userNewProperties,
    );
  }

  @Post('avatar/employee/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadEmployeePicture(
    @Param('id') employeeId: string,
    @UploadedFile() file?: any,
    @Body('oldAvatarUrl') oldAvatarUrl?: string,
  ) {
    let employeeNewProperties;
    if (file){
    employeeNewProperties = {
      avatarUrl: `http://localhost:3000/admin/avatar/` + file.filename,
    };
  } else {
    employeeNewProperties = {
      avatarUrl: `http://localhost:3000/admin/avatar/Profile_Icon.png`,
    };
  }

      if (oldAvatarUrl && oldAvatarUrl !== 'http://localhost:3000/admin/avatar/Profile_Icon.png') {
        this.adminService.deleteFile(oldAvatarUrl.split('/').pop());
      }
      return await this.adminService.updateEmployeeProficePicture(employeeId, employeeNewProperties);
  }

  @Get('avatar/:imgpath')
  public async getFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: 'src/uploads/avatars' });
  }

  @Get('user/:id')
  public async getUserById(
   @Param('id') 
   userId: string
  ): Promise<UserDTO> {
      return this.adminService.getUserById(userId);
  }

  @Get('employee/:id')
  public async getEmployeeById(
   @Param('id') 
   employeeId: string
  ): Promise<EmployeeDTO> {
      return this.adminService.getEmployeeById(employeeId);
  }

  @Get('user')
  public async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('employee')
  public async getAllEmployees() {
    return this.adminService.getAllEmployees();
  }

  @Get('/skill/:name')
  public async getSkillByName(
    @Param('name')
    name: string
  ): Promise<Skill> {
      return this.adminService.getSkillByName(name);
  }
  
  @Get('/skillcatalog')
  public async getSkillCatalog(): Promise<Skill[]> {
    return this.adminService.getSkillCatalog();
  }

  @Get('email/:email')
  public async getUserByEmail(
    @Param('email') 
    userEmail: string
  ): Promise<UserDTO> {
      return this.adminService.getUserByEmail(userEmail);
  }
}
