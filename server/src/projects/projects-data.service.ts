import { User } from './../database/entities/user.entity';
import { UpdateProjectDTO } from './../models/dto/project/update-project.dto';
import { CreateProjectDTO } from './../models/dto/project/create-project.dto';
import { ShowProjectDTO } from './../models/dto/project/show-project.dto';
import { Project } from './../database/entities/project.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Migration } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProjectsDataService {
    public constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    public async getAllProjects(): Promise<ShowProjectDTO[]> {

        const projects: Project[] = await this.projectRepository.find({relations: ['requirements']});

        if (projects.length === 0) {
            throw new HttpException('No Projects found!', 404);
        }

        return plainToClass(ShowProjectDTO, projects, {
            excludeExtraneousValues: true,
        });
    }

    public async getProjectById(
        id: string,
    ): Promise<ShowProjectDTO> {

        const project: Project = await this.projectRepository.findOne(id);

        if (project === undefined) {
            throw new HttpException('No such Project found!', 404);
        }

        return plainToClass(ShowProjectDTO, project, {
            excludeExtraneousValues: true,
        });
    }

    public async createProject(
        body: CreateProjectDTO,
    ): Promise<ShowProjectDTO> {
        const projectEntity: Project = this.projectRepository.create();
        projectEntity.due = body.due;
        projectEntity.title = body.title;
        projectEntity.description = body.description;

        const manager: User = await this.usersRepository.findOne({where: 
            { email: body.userEmail
        }});

        projectEntity.manager = manager;
        
        const savedProject: Project = await this.projectRepository.save(projectEntity);

        return plainToClass(ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }

    public async updateProject(
        id: string,
        body: UpdateProjectDTO,
        // user: ShowUserDTO,
    ): Promise<ShowProjectDTO> {
        console.log(id)
        const oldProject: Project = await this.projectRepository.findOne(id);

        // const oldProjectCreatedBy: User = await this.usersRepository.findOne({
        //   where: { user },
        // });

        // if (oldProjectCreatedBy.id !== user.id) {
        //   throw new HttpError(
        //     'You dont have permission to edit this post!',
        //     666,
        //   );
        // }

        const updatedProject: Project = { ...oldProject, ...body };
        const savedProject: Project = await this.projectRepository.save(updatedProject);

        return plainToClass(ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }

}
