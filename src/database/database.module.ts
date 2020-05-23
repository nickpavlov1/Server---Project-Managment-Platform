import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE_NAME'),
          username: configService.get('DB_USERNAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadModels: true,
        }),
      }),
    ],
  })
  export class DatabaseModule {}