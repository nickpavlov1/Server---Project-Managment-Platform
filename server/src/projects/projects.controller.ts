import { UserDTO } from 'src/models/dto/user/user.dto';
import { User } from './../common/decorators/user.decorator';
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
} from '@nestjs/common';
import { ProjectsDataService } from './projects-data.service';
import { CreateProjectDTO } from './../models/dto/project/create-project.dto';
import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardWithBlacklisting } from 'src/common/guards/blacklist.guard';

@Controller()
export class ProjectsController {
    public constructor(private readonly projectsDataService: ProjectsDataService) { }

    @Get('projects')
    @HttpCode(HttpStatus.OK)
    public async getAllProjects(): Promise<ShowProjectDTO[]> {
        return await this.projectsDataService.getAllProjects();
    }

    @Post('project')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async createProject(
        @User() user: UserDTO,
        @Body() body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.createProject(
            body,
            user,
        );
    }

    @Get('project/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async getProjectById(
        @Param('id') id: string,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.getProjectById(id);
    }

    @Put('project/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async updateProject(
        @User() user: UserDTO,
        @Param('id') id: string,
        @Body() body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.updateProject(
            id,
            body,
            user,
        );
    }
}
