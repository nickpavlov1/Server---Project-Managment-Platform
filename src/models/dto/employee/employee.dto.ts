import { ShowContributionDTO } from './../contribution/show-contribution.dto';
import { Expose, Type } from "class-transformer";
import { SkillDTO } from "../skill/skill.dto";
import { ManyToOne } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

export class EmployeeDTO {
    @Expose()
    id: string;

    @Expose()
    avatarUrl: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    jobTitle: string;

    @Expose()
    jobDescription: string;

    @Expose()
    registered: Date;

    @Expose()
    updated: Date;

    @Expose()
    availableWorkHours: number;

    @Expose()
    directManager: string;

    @Expose()
    @Type(() => SkillDTO)
    public skillset: SkillDTO;

    @Expose()
    @Type(() => ShowContributionDTO)
    public contributions: ShowContributionDTO;
  }