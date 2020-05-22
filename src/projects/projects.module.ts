import { Project } from '../database/entities/project.entity';
import { Module } from '@nestjs/common';
import { ProjectsDataService } from './projects-data.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project, User])],
    controllers: [ProjectsController],
    providers: [ProjectsDataService]
})
export class ProjectsModule { }
