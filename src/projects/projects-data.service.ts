import { UserDTO } from 'src/models/dto/user/user.dto';
import { User } from '../database/entities/user.entity';
import { UpdateProjectDTO } from '../models/dto/project/update-project.dto';
import { CreateProjectDTO } from '../models/dto/project/create-project.dto';
import { ShowProjectDTO } from '../models/dto/project/show-project.dto';
import { Project } from '../database/entities/project.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Migration, In } from 'typeorm';
import { plainToClass } from 'class-transformer';
import "reflect-metadata";

@Injectable()
export class ProjectsDataService {
    public constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    public async getAllProjects(
        // relations?

    ): Promise<ShowProjectDTO[]> {
        // const options = {
        //     join: {
        //         alias: "project",
        //         leftJoinAndSelect: {
        //             ...(relations.find(el => el == 'requirements') && { requirements: "project.requirements" }),
        //             ...(relations.find(el => el == 'requiredSkill') && { requiredSkill: "requirements.requiredSkill" }),
        //             ...(relations.find(el => el == 'contributions') && { contributions: "requirements.contributions" }),
        //             ...(relations.find(el => el == 'contributor') && { contributor: "contributions.contributor" })
        //         }
        //     },
        //     ...(skip && { skip: skip }),
        //     ...(limit && { take: limit }),
        // }

        const projects: Project[] = await this.projectRepository.find(
            // options
            {
                // join: {
                //     alias: "project",
                //     leftJoinAndSelect: {
                //         "requirements": "project.requirements",
                //         "requiredSkill": "requirements.requiredSkill",
                //         "contributions": "requirements.contributions",
                //         "contributor": "contributions.contributor",
                //     }
                // }
            }
        );

        return plainToClass(ShowProjectDTO, projects, {
            excludeExtraneousValues: true,
        });
    }

    public async getEmployeeProjectsByIds(
        ids: string,
    ): Promise<ShowProjectDTO[]> {
            const idsArr = ids.split(',');
       
            const projects = await this.projectRepository.find({where: { id: In(idsArr) }});

            return plainToClass(ShowProjectDTO, projects, {
            excludeExtraneousValues: true,
            });
    }

    public async getProjectById(
        id: string,
    ): Promise<ShowProjectDTO> {
        
        const project: Project = await this.projectRepository.findOne({id});

        if (!project) {
            throw new HttpException('No such Project found!', 404);
        }

        return plainToClass(ShowProjectDTO, project, {
            excludeExtraneousValues: true,
        });
    }

    public async createProject(
        body: CreateProjectDTO,
        user: UserDTO,
    ): Promise<ShowProjectDTO> {

        const projectEntity: Project = this.projectRepository.create();
        projectEntity.title = body.title;
        projectEntity.description = body.description;
        projectEntity.dailyHourlyManagerContribution = body.dailyHourlyManagerContribution;

        const dueDate = new Date(body.dueDate);

        projectEntity.dueDate = dueDate;

        if (body.finishesOn) {
            const date = new Date(body.finishesOn);
            projectEntity.finishesOn = date;
        }

        const manager: User = await this.usersRepository.findOne(user.id);

        if (!manager) {
            throw new HttpException('No such manager found, please login!', 404);
        }

        projectEntity.manager = manager;

        const savedProject: Project = await this.projectRepository.save(projectEntity);

        return plainToClass(ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }

    public async updateProject(
        id: string,
        body: UpdateProjectDTO,
        user: UserDTO,
    ): Promise<ShowProjectDTO> {
        const oldProject: Project = await this.projectRepository.findOne(id);

        if (!oldProject) {
            throw new HttpException('No such project found!', 404);
        }

        if (oldProject.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to edit this project!',
                403,
            );
        }

        if (body.dueDate) {
            const date = new Date(body.dueDate);
            oldProject.dueDate = date;
        }

        if(body.finishesOn === null) {
            oldProject.finishesOn = null;
        }
    
        if (body.finishesOn && body.finishesOn !== null) {
            const date = new Date(body.finishesOn)
            oldProject.finishesOn = date;
        }

        if (body.description) {
            oldProject.description = body.description;
        }
        
        if (body.title) {
            oldProject.title = body.title;
        }

        const savedProject: Project = await this.projectRepository.save(oldProject);

        return plainToClass(ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }

    public async stopProject(
        id: string,
        user: UserDTO
    ): Promise<ShowProjectDTO> {
        const foundProject = await this.projectRepository.findOne(id);

        if (!foundProject) {
            throw new HttpException('No such project found!', 404);
        }

        if (foundProject.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to stop this project!',
                403,
            );
        }

        foundProject.isStopped = true;

        const stoppedProject = await this.projectRepository.save(foundProject);

        return plainToClass(ShowProjectDTO, stoppedProject, {
            excludeExtraneousValues: true,
        });
    }
}
