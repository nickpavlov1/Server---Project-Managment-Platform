import { UserDTO } from 'src/models/dto/user/user.dto';
import { User } from '../common/decorators/user.decorator';
import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    Put,
    Param,
    UseGuards,
    Query,
    Delete,
} from '@nestjs/common';
import { ProjectsDataService } from './projects-data.service';
import { CreateProjectDTO } from '../models/dto/project/create-project.dto';
import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardWithBlacklisting } from 'src/common/guards/blacklist.guard';

@Controller()
export class ProjectsController {
    public constructor(private readonly projectsDataService: ProjectsDataService) { }

    @Get('projects')
    @HttpCode(HttpStatus.OK)
    public async getAllProjects(
        // @Query('relations') relations?: string,
    ): Promise<ShowProjectDTO[]> {
        return await this.projectsDataService.getAllProjects(
            // relations
        );
    }

    @Post('project')
    @HttpCode(HttpStatus.CREATED)
    // @UseGuards(AuthGuard('jwt'))
    public async createProject(
        @User() user,
        @Body() body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.createProject(
            body,
            user,
        );
    }

    @Get('employee/projects/:id')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    public async getEmployeeProjectsByIds(
        @Param('id') ids: string,
    ): Promise<ShowProjectDTO[]> {
        return await this.projectsDataService.getEmployeeProjectsByIds(ids);
    }

    @Get('project/:id')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    public async getProjectById(
        @Param('id') id: string,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.getProjectById(id);
    }

    @Put('project/:id')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    public async updateProject(
        @Param('id') id: string,
        @Body() body: CreateProjectDTO,
        @User() user
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.updateProject(
            id,
            body,
            user,
        );
    }

    @Delete('project/:id')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    public async stopProject(
        @Param('id') id: string,
        @User() user
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.stopProject(
            id,
            user,
        );
    }
}
