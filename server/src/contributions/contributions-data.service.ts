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
    ) {
        // const employeeNew = this.employeesRepository.create({
        //     email: '@mario.com',
        //     jobTitle: 'jobtitile',
        //     jobDescription: 'desc',
        //     availableWorkHours: 8,
        // });
        // this.employeesRepository.save(employeeNew)
    
        // const projects: Project[] = await this.projectsRepository.find({relations: ['requirements']});

        // const projects = await this.usersRepository.find();
        const employee: Employee = await this.employeesRepository.findOne({
            where:
            {
                email: body.email
            }
        });


        // console.log(foundUser)
        // if (!foundUser) {
        //   throw new HttpException('No Such User Found', 404);
        // }

        // if (foundUser.email !== user.email) {
        //   throw new HttpException('You don't have permission to add a contribution
        //   to this project!', 403);
        // }

        const reqEntity: Requirement = await this.requirementsRepository.findOne({
            where: { id: reqId }, 
            relations: ['contributions'],
        });

        if (!reqEntity) {
          throw new HttpException('No Such Requirement Found', 404);
        }

        const contributionEntity: Contribution = this.contributionsRepository.create({
            dailyHourlyContribution: body.dailyHourlyContribution
        });

        employee.availableWorkHours = employee.availableWorkHours - body.dailyHourlyContribution;

        this.employeesRepository.save(employee);

        contributionEntity.contributor = employee;

        const savedContribution: Contribution = await this.contributionsRepository.save(contributionEntity);

        reqEntity.contributions.push(savedContribution)

        const savedRequirement: Requirement = await this.requirementsRepository.save(reqEntity);

        // return savedContribution
        return plainToClass(ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async getAllContributions(projectId: string): Promise<ShowContributionDTO[]> {
        const contributions: Contribution[] = await this.contributionsRepository.find();

        if (contributions.length === 0) {
            throw new HttpException('No Contributions found!', 404);
        }

        return plainToClass(ShowContributionDTO, contributions, {
            excludeExtraneousValues: true,
        });
    }

    public async getContributionById(
        id: string,
    ) {
        const foundContribution: Contribution = await this.contributionsRepository.findOne(id, {relations:['contributor']});

        if (foundContribution === undefined) {
            throw new HttpException('No such Contribution found!', 404);
        }
       
        return plainToClass(ShowContributionDTO, foundContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async updateContribution(
        id: string,
        body: CreateContributionDTO,
    ): Promise<ShowContributionDTO> {

        const oldContribution: Contribution = await this.contributionsRepository.findOne(id);
        const updatedContribution: Contribution = { ...oldContribution, ...body };
        const savedContribution: Contribution = await this.contributionsRepository.save(updatedContribution);

        return plainToClass(ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }

    public async deleteContribution(id: string) {
        const foundContribution: Contribution = await this.contributionsRepository.findOne(id);
        foundContribution.isDeleted = true;
        // foundContribution.contributionEnd = new Date();
        console.log(foundContribution)
        // const contributionEmployee = await this.usersRepositry.findOne()
        return this.contributionsRepository.save({ ...foundContribution, isDeleted: true, });
    }


}
