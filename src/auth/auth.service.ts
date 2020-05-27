import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUserDTO } from "src/models/dto/user/login-user.dto";
import { IJWTPayload } from "./strategy/interface/jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from "./user.repository";
import { UserDTO } from '../models/dto/user/user.dto';

@Injectable()
export class AuthService {

    private readonly blacklist: string[] = [];
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,

        private readonly jwtService: JwtService,
    ) {}

    public async login(loginUserDTO: LoginUserDTO): Promise<{ accessToken: string }> {
      const userEmail = await this.userRepository.validateUserPassword(loginUserDTO)
      if (!userEmail) {
        throw new UnauthorizedException('Invalid credentials!')
      }
      const user: UserDTO = await this.userRepository.findOne({
          where: { email: userEmail } 
        })
      const payload: IJWTPayload = { ...user };
      const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken };
      }

      public blacklistToken(token: string): void {
        this.blacklist.push(token);
      }

      public isTokenBlacklisted(token: string): boolean {
        return this.blacklist.includes(token);
      }
}
