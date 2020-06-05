import { UserDTO } from '../models/dto/user/user.dto';
import { UpdateRequirementDTO } from '../models/dto/requirement/update-requirement.dto';
import { Requirement } from '../database/entities/requirement.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateRequirementDTO } from '../models/dto/requirement/create-requirement.dto';
import { ShowRequirementDTO } from '../models/dto/requirement/show-requirement.dto';
import { Skill } from '../database/entities/skill.entity';
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

    public async getAllRequirements(projectId: string): Promise<ShowRequirementDTO[]> {
        const requirements: Requirement[] = await this.requirementsRepository.find({
            where: { project: projectId }
        });

        if (requirements.length === 0) {
            throw new HttpException('No Requirements found!', 404);
        }

        return plainToClass(ShowRequirementDTO, requirements, {
            excludeExtraneousValues: true,
        });
    }

    public async getRequirementById(
        id: string,
    ): Promise<ShowRequirementDTO> {

        const requirement: Requirement = await this.requirementsRepository.findOne(id);

        if (!requirement) {
            throw new HttpException('No such Requirement found!', 404);
        }

        return plainToClass(ShowRequirementDTO, requirement, {
            excludeExtraneousValues: true,
        });
    }

    public async createRequirement(
        projectId: string,
        body: CreateRequirementDTO,
        user: UserDTO,
    ): Promise<ShowRequirementDTO> {
        const projectFound: Project = await this.projectsRepository.findOne({
            where: { id: projectId },
        });

        if (projectFound.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to add requirements to this project!',
                403,
            );
        }

        const skillEntity: Skill = await this.skillsRepository.findOne({
            skillName: body.requiredSkill
        });

        if (!skillEntity) {
            throw new HttpException('No Such Skill Found', 404);
        }

        const reqEntity: Requirement = this.requirementsRepository.create({
            requiredTime: body.requiredTime,
        });

        reqEntity.requiredSkill = skillEntity;
        reqEntity.project = projectFound;

        if(body.requirementEnd){
            reqEntity.requirementEnd = new Date(body.requirementEnd)
        }
        
        const savedRequirement: Requirement = await this.requirementsRepository.save(reqEntity);

        return plainToClass(ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }

    public async updateRequirement(
        id: string,
        body: UpdateRequirementDTO,
        user: UserDTO,
    ): Promise<ShowRequirementDTO> {

        const oldRequirement: Requirement = await this.requirementsRepository.findOne(
            id,
            { relations: ['project'] }
        );

        if (oldRequirement.project.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to change the requirements to this project!',
                403,
            );
        }

        if (body.requirementEnd) {
            const date = new Date(body.requirementEnd)
            oldRequirement.requirementEnd = date;
        }

        if(body.requirementEnd == null) {
            oldRequirement.requirementEnd = null;
        }

        if (body.requirementEnd) {
            const date = new Date(body.requirementEnd)
            oldRequirement.requirementEnd = date;
        }

        if (body.requiredTime) {
            oldRequirement.requiredTime = +body.requiredTime;
        }

        const savedRequirement: Requirement = await this.requirementsRepository.save(oldRequirement);

        return plainToClass(ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }

    public async deleteRequirement(
        reqId: string,
        user: UserDTO
    ): Promise<ShowRequirementDTO> {
        const foundRequirement = await this.requirementsRepository.findOne(
            reqId,
            { relations: ['project'] }
        );

        if (!foundRequirement) {
            throw new HttpException('No such requirement found!', 404);
        }

        if (foundRequirement.project.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to delete this requirement!',
                403,
            );
        }

        foundRequirement.isDeleted = true;

        const deletedRequirement = await this.requirementsRepository.save(foundRequirement);

        return plainToClass(ShowRequirementDTO, deletedRequirement, {
            excludeExtraneousValues: true,
        });
    }

}
