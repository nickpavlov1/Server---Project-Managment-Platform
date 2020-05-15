import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
    imports: [
        UserRepository,
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [UserRepository]
})
export class AdminModule {}
