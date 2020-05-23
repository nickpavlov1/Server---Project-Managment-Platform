import { ContributionsModule } from './contributions/contributions.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { RequirementsModule } from './requirements/requirements.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_TYPE: Joi.string().default('mysql'),
        DB_HOST: Joi.string().default(process.env.CLEARDB_DATABASE_URL),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().default('b065ce5d3e793e'),
        DB_PASSWORD: Joi.string().default('356e188e'),
        DB_DATABASE_NAME: Joi.string().default('heroku_cb78149dbf0a417'),
      }),
    }),
    ProjectsModule,
    RequirementsModule,
    ContributionsModule,
    AuthModule,
    AdminModule,
  ]
})

export class AppModule {}