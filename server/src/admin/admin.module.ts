import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Skill } from './../database/entities/skill.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
