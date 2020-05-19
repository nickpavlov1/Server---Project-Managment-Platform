import { Employee } from 'src/database/entities/employee.entity';
import { User } from './../database/entities/user.entity';
import { Skill } from './../database/entities/skill.entity';
import { Requirement } from './../database/entities/requirement.entity';
import { Module } from '@nestjs/common';
import { RequirementsController } from './requirements.controller';
import { RequirementsDataService } from './requirements-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement, Skill, Project, User, Employee])],
  controllers: [RequirementsController],
  providers: [RequirementsDataService]
})
export class RequirementsModule {}
