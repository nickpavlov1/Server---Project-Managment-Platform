import { Skill } from './../database/entities/skill.entity';
import { Requirement } from './../database/entities/requirement.entity';
import { Module } from '@nestjs/common';
import { RequirementsController } from './requirements.controller';
import { RequirementsDataService } from './requirements-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Requirement, Skill])],
  controllers: [RequirementsController],
  providers: [RequirementsDataService]
})
export class RequirementsModule {}
