import { Employee } from './../database/entities/employee.entity';
import { Contribution } from './../database/entities/contribution.entity';
import { Module } from '@nestjs/common';
import { ContributionsController } from './contributions.controller';
import { ContributionsDataService } from './contributions-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';
import { Skill } from 'src/database/entities/skill.entity';
import { Requirement } from 'src/database/entities/requirement.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill, Contribution, Requirement, Employee])],
  controllers: [ContributionsController],
  providers: [ContributionsDataService]
})
export class ContributionsModule {}
