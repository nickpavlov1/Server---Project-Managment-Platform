import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module, HttpException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { EmployeeRepository } from './employee.repository';
import { SkillRepository } from './skill.repository';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
    imports: [
        UserRepository,
        EmployeeRepository,
        SkillRepository,
        TypeOrmModule.forFeature([UserRepository, EmployeeRepository, SkillRepository]),
        MulterModule.register({
            fileFilter(_, file, cb) {
              const ext = extname(file.originalname);
              const allowedExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
      
              if (!allowedExtensions.includes(ext)) {
                return cb(
                  new HttpException('Only images are allowed', 400),
                  false,
                );
              }
      
              cb(null, true);
            },
            storage: diskStorage({
              destination: './src/uploads/avatars',
              filename: (_, file, cb) => {
                const randomName = Array.from({ length: 32 })
                  .map(() => Math.round(Math.random() * 10))
                  .join('');
      
                return cb(null, `${randomName}${extname(file.originalname)}`);
              },
            }),
          }),
    ],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [UserRepository]
})
export class AdminModule {}
