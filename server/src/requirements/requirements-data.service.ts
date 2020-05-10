import { Requirement } from './../database/entities/requirement.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './../database/entities/project.entity';
import { Repository } from 'typeorm';
import { ShowProjectDTO } from './../models/dto/project/show-project.dto';
import { plainToClass } from 'class-transformer';
import { CreateRequirementDTO } from './../models/dto/requirement/create-requirement.dto';
import { ShowRequirementDTO } from 'src/models/dto/requirement/show-requirement.dto';

@Injectable()
export class RequirementsDataService {
    public constructor(
        @InjectRepository(Requirement)
        private readonly requirementsRepository: Repository<Requirement>,
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
        body: CreateRequirementDTO,
        // user: ShowUserDTO,
    ): Promise<ShowRequirementDTO> {
        const reqEntity: Requirement = this.requirementsRepository.create(body);
        // const foundUser: User = await this.usersRepository.findOne({
        //   username: user.username,
        // });

        // if (!foundUser) {
        //   throw new HttpException('No Such User Found', 404);
        // }

        const savedRequirement: Requirement = await this.requirementsRepository.save(reqEntity);

        return plainToClass(ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }




}
