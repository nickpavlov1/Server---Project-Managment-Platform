import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    Query,
    Put,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ProjectsDataService } from './projects-data.service';
import { CreateProjectDTO } from './../models/dto/project/create-project.dto';
import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';

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
    // @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async createProject(
        @Body() body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.createProject(
            body,
            // user,
        );
    }

    @Get('project/:id')
    @HttpCode(HttpStatus.OK)
    public async getProjectById(
        @Param('id') id: string,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.getProjectById(id);
    }

    @Put('project/:id')
    // @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async updateProject(
        // @User() user,
        @Param('id') id: string,
        @Body() body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        return await this.projectsDataService.updateProject(
            id,
            body,
            // user,
        );
    }
}
