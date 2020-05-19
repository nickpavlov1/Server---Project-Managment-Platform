import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { EmployeeRepository } from './employee.repository';
import { SkillRepository } from './skill.repository';

@Module({
    imports: [
        UserRepository,
        EmployeeRepository,
        SkillRepository,
        TypeOrmModule.forFeature([UserRepository, EmployeeRepository, SkillRepository]),
    ],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [UserRepository]
})
export class AdminModule {}
