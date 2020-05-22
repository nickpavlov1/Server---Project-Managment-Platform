"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_entity_1 = require("./../database/entities/project.entity");
const common_1 = require("@nestjs/common");
const projects_data_service_1 = require("./projects-data.service");
const projects_controller_1 = require("./projects.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./../database/entities/user.entity");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, user_entity_1.User])],
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_data_service_1.ProjectsDataService]
    })
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
//# sourceMappingURL=projects.module.js.map