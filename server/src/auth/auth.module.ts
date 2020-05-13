import { AdminModule } from "src/admin/admin.module";
import { Module } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UserRepository,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: +configService.get('JWT_EXPIRE_TIME'),
        },
    }),
  }),
    ],
  providers: [
    AdminModule,
    ConfigService,
    ConfigModule,
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule
  ],
})
export class AuthModule {}