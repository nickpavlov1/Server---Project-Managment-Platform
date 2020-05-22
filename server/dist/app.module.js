"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const contributions_module_1 = require("./contributions/contributions.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const projects_module_1 = require("./projects/projects.module");
const requirements_module_1 = require("./requirements/requirements.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const Joi = require("@hapi/joi");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    PORT: Joi.number().default(3000),
                    DB_TYPE: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_DATABASE_NAME: Joi.string().required(),
                }),
            }),
            projects_module_1.ProjectsModule,
            requirements_module_1.RequirementsModule,
            contributions_module_1.ContributionsModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map