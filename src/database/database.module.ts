import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: 'mysql' || configService.get('DB_TYPE'),
          host: 'localhost' || configService.get('DB_HOST'),
          port: process.env.CLEARDB_DATABASE_URL || +configService.get('DB_PORT'),
          username: 'b065ce5d3e793e' || configService.get('DB_USERNAME'),
          password: '356e188e' || configService.get('DB_PASSWORD'),
          database: 'heroku_cb78149dbf0a417' || configService.get('DB_DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadModels: true,
        }),
      }),
    ],
  })
  export class DatabaseModule {}