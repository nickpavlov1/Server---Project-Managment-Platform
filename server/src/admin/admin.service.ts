import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { RegisterUserDTO } from 'src/models/dto/user/register-user.dto';
import { UserDTO } from 'src/models/dto/user/user.dto';
import * as bcrypt from 'bcrypt'
import { User } from 'src/database/entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AdminService {
    constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
    ) {}

    public async registerUser(registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
        const { password, email, firstname, lastname, jobTitle, jobDescription, directManager } = registerUserDTO;
    
        await this.userRepository.matchEmail(email);
        
        const user = new User();

        user.salt = await bcrypt.genSalt();
        user.email = email;
        user.jobTitle = jobTitle;
        user.jobDescription = jobDescription;
        user.password = await this.passwordHash(password, user.salt);
        user.firstname = firstname;
        user.lastname = lastname;

        const setDirectManager = await this.userRepository.findOne(
            { where: { email: directManager }}
            );

        if (setDirectManager) {
            user.directManager = setDirectManager.email;
        }
        const registerdUser = await user.save();
    
           return plainToClass(UserDTO, registerdUser, { excludeExtraneousValues: true });
        }
        private async passwordHash(password: string, salt: string): Promise<string> {
            return bcrypt.hash(password, salt);
        }
}
