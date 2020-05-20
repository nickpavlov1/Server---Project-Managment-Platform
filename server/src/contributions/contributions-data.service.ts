import { UserDTO } from './../models/dto/user/user.dto';
import { UpdateContributionDTO } from './../models/dto/contribution/update-contribution.dto';
import { User } from 'src/database/entities/user.entity';
import { ShowContributionDTO } from './../models/dto/contribution/show-contribution.dto';
import { Requirement } from './../database/entities/requirement.entity';
import { CreateContributionDTO } from './../models/dto/contribution/create-contribution.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';
import { Repository, Migration } from 'typeorm';
import { Skill } from 'src/database/entities/skill.entity';
import { CreateRequirementDTO } from 'src/models/dto/requirement/create-requirement.dto';
import { plainToClass } from 'class-transformer';
import { ShowRequirementDTO } from 'src/models/dto/requirement/show-requirement.dto';
import { Contribution } from 'src/database/entities/contribution.entity';
import { Employee } from 'src/database/entities/employee.entity';

@Injectable()
export class ContributionsDataService {
    public constructor(
        @InjectRepository(Employee)
        private readonly employeesRepository: Repository<Employee>,
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        @InjectRepository(Skill)
        private readonly skillsRepository: Repository<Skill>,
        @InjectRepository(Contribution)
        private readonly contributionsRepository: Repository<Contribution>,
        @InjectRepository(Requirement)
        private readonly requirementsRepository: Repository<Requirement>,

    ) { }

    public async createContribution(
        reqId: string,
        body: CreateContributionDTO,
        user: UserDTO,
    ) {
        const requirement: Requirement = await this.requirementsRepository.findOne(
            reqId,
            { relations: ['project'] }
        );

        if (!requirement) {
            throw new HttpException('No Such Requirement Found', 404);
        }

        if (requirement.project.manager.id !== user.id) {
            throw new HttpException(
                'You dont have permission to add contributions to this project!',
                403,
            );
        }

        const employee: Employee = await this.employeesRepository.findOne({
            where:
            {
                email: body.userEmail
            }
        });

        if (!employee) {
            throw new HttpException('No Such Employee Found', 404);
        }

        const contributionEntity: Contribution = this.contributionsRepository.create({
            dailyHourlyContribution: +body.dailyHourlyContribution
        });

        // employee.availableWorkHours = employee.availableWorkHours - body.dailyHourlyContribution;

        // this.employeesRepository.save(employee);

        contributionEntity.contributor = employee;

        const savedContribution: Contribution = await this.contributionsRepository.save(contributionEntity);

        requirement.contributions.push(savedContribution)

        const savedRequirement: Requirement = await this.requirementsRepository.save(requirement);

        return plainToClass(ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async getAllContributions(): Promise<ShowContributionDTO[]> {
        const contributions: Contribution[] = await this.contributionsRepository.find({
            relations: ['requirement']
        });

        if (contributions.length === 0) {
            throw new HttpException('No Contributions found!', 404);
        }

        return plainToClass(ShowContributionDTO, contributions, {
            excludeExtraneousValues: true,
        });
    }

    public async getContributionById(
        id: string,
    ): Promise<ShowContributionDTO> {
        const foundContribution: Contribution = await this.contributionsRepository.findOne(
            id,
            {
                relations: ['contributor']
            }
        );

        if (foundContribution === undefined) {
            throw new HttpException('No such Contribution found!', 404);
        }

        return plainToClass(ShowContributionDTO, foundContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async updateContribution(
        id: string,
        body: UpdateContributionDTO,
    ): Promise<ShowContributionDTO> {
        const { dailyHourlyContribution } = body;

        const oldContribution: Contribution = await this.contributionsRepository.findOne(id);

        if (dailyHourlyContribution) {
            oldContribution.dailyHourlyContribution = +dailyHourlyContribution;
        }
        const savedContribution: Contribution = await this.contributionsRepository.save(oldContribution);

        return plainToClass(ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async deleteContribution(id: string) {
        const foundContribution: Contribution = await this.contributionsRepository.findOne(id);
        foundContribution.isDeleted = true;
        console.log(foundContribution)
        return this.contributionsRepository.save({ ...foundContribution, isDeleted: true, });
    }


}
