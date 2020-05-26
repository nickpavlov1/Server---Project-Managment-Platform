import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: process.env.DB_TYPE as any || configService.get('DB_TYPE'),
          host: process.env.DB_HOST || configService.get('DB_HOST'),
          port: process.env.DB_PORT || +configService.get('DB_PORT'),
          username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
          password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
          database: process.env.DB_DATABASE_NAME || configService.get('DB_DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadModels: true,
        }),
      }),
    ],
  })
  export class DatabaseModule {}