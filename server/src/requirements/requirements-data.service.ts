import { UpdateRequirementDTO } from './../models/dto/requirement/update-requirement.dto';
import { Requirement } from './../database/entities/requirement.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateRequirementDTO } from './../models/dto/requirement/create-requirement.dto';
import { ShowRequirementDTO } from './../models/dto/requirement/show-requirement.dto';
import { Skill } from './../database/entities/skill.entity';
import { Project } from 'src/database/entities/project.entity';

@Injectable()
export class RequirementsDataService {
    public constructor(
        @InjectRepository(Requirement)
        private readonly requirementsRepository: Repository<Requirement>,
        @InjectRepository(Skill)
        private readonly skillsRepository: Repository<Skill>,
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
    ) { }

    public async getAllRequirements(): Promise<ShowRequirementDTO[]> {
        const requirements: Requirement[] = await this.requirementsRepository.find();

        // if (requirements.length === 0) {
        //     throw new HttpException('No Requirement found!', 404);
        // }

        return plainToClass(ShowRequirementDTO, requirements, {
            excludeExtraneousValues: true,
        });
    }

    public async getRequirementById(
        id: string,
    ): Promise<ShowRequirementDTO> {

        const requirement: Requirement = await this.requirementsRepository.findOne(id);

        if (requirement === undefined) {
            throw new HttpException('No such Requirement found!', 404);
        }

        return plainToClass(ShowRequirementDTO, requirement, {
            excludeExtraneousValues: true,
        });
    }

    public async createRequirement(
        projectId: string,
        body: CreateRequirementDTO,
        // user: ShowUserDTO,
    ) {

        const projectFound: Project = await this.projectsRepository.findOne({
            where: {id: projectId }, 
            relations: ['requirements'],
        });
        
        // const foundUser: User = await this.usersRepository.findOne({
        //   email: user.email,
        // });

        // if (!foundUser) {
        //   throw new HttpException('No Such User Found', 404);
        // }
        
        // if (foundUser.email !== user.email) {
        //   throw new HttpException('You don't have permission to add a requirement
        //   to this project!', 403);
        // }

        const skillEntity: Skill = await this.skillsRepository.findOne({
            skillName: body.requiredSkill
        });
        
        if (!skillEntity) {
          throw new HttpException('No Such Skill Found', 404);
        }
        
        const reqEntity: Requirement = this.requirementsRepository.create({
            requiredTime: body.requiredTime
        });
        
        reqEntity.requiredSkill = skillEntity;
        reqEntity.project = projectFound;

        const savedRequirement: Requirement = await this.requirementsRepository.save(reqEntity);

        if(projectFound.requirements == undefined) {
            projectFound.requirements = [];
        }

        projectFound.requirements.push(savedRequirement);

        const savedProject: Project = await this.projectsRepository.save(projectFound);

        return plainToClass(ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }

    public async updateRequirement(
        id: string,
        body: UpdateRequirementDTO,
        // user: ShowUserDTO,
    ): Promise<ShowRequirementDTO> {
        const oldRequirement: Requirement = await this.requirementsRepository.findOne(id);

        // const oldRequirementCreatedBy: User = await this.usersRepository.findOne({
        //   where: { user },
        // });

        // if (oldProjectCreatedBy.id !== user.id) {
        //   throw new HttpError(
        //     'You dont have permission to edit this Requirement!',
        //     403,
        //   );
        // }

        const updatedRequirement: Requirement = { ...oldRequirement, ...body };
        const savedRequirement: Requirement = await this.requirementsRepository.save(updatedRequirement);

        return plainToClass(ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }

}
