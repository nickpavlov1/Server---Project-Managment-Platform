import { plainToClass } from 'class-transformer';
import { CreateSkillDTO } from '../models/dto/skill/create-skill.dto';
import { Skill } from './../database/entities/skill.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowSkillDTO } from 'src/models/dto/skill/show-skill.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillsRepository: Repository<Skill>, 
    ) { }

    public async createSkill(body: CreateSkillDTO) {
        const newSkill = this.skillsRepository.create(body);
        this.skillsRepository.save(newSkill);

        return plainToClass(ShowSkillDTO, newSkill, {
            excludeExtraneousValues: true,
        })
    }

}
