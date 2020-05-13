import { ShowContributionDTO } from './../models/dto/contribution/show-contribution.dto';
import { Requirement } from './../database/entities/requirement.entity';
import { CreateContributionDTO } from './../models/dto/contribution/create-contribution.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';
import { Repository } from 'typeorm';
import { Skill } from 'src/database/entities/skill.entity';
import { CreateRequirementDTO } from 'src/models/dto/requirement/create-requirement.dto';
import { plainToClass } from 'class-transformer';
import { ShowRequirementDTO } from 'src/models/dto/requirement/show-requirement.dto';
import { Contribution } from 'src/database/entities/contribution.entity';

@Injectable()
export class ContributionsDataService {
    public constructor(
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
        // user: ShowUserDTO,
    ) {
        // const foundUser: User = await this.usersRepository.findOne({
        //   email: user.email,
        // });

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
            dailyHourlyContribution: body.contributedTime
        });

        // contributionEntity.contributor = foundUser;

        const savedContribution: Contribution = await this.contributionsRepository.save(contributionEntity);
        
        reqEntity.contributions.push(savedContribution)

        const savedRequirement: Requirement = await this.requirementsRepository.save(reqEntity);

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

}
