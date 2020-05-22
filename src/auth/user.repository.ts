import { Repository, EntityRepository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { LoginUserDTO } from '../models/dto/user/login-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserDTO } from 'src/models/dto/user/user.dto';
import { plainToClass } from 'class-transformer';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async viewUserById(userId: string): Promise<UserDTO> {
    const foundUser: User = await this.findOne(userId);
        if (!foundUser) {
        throw new NotFoundException(`User does not exist.`);
        }
        return plainToClass(UserDTO, foundUser, { excludeExtraneousValues: true });
}

    public async matchEmail(email: string): Promise<void> {
      const matchEmail = await this.findOne({ 
      where: { email: email }
      });
      if (matchEmail) {
        throw new ConflictException(`This email ${email} is already taken!`);
      }
  }
    public async validateUserPassword(loginUserDTO: LoginUserDTO) {
        const matchUser = loginUserDTO;
        const user = await this.findOne({
          where: { email: matchUser.email }
        });
        if (user && await user.validatePassword(matchUser.password)) {
          return matchUser.email;
        } else {
          return null;
        }
      }
}