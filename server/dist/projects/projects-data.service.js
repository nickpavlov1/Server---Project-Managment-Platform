"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = require("../models/dto/user/user.dto");
const user_entity_1 = require("./../database/entities/user.entity");
const show_project_dto_1 = require("./../models/dto/project/show-project.dto");
const project_entity_1 = require("./../database/entities/project.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
let ProjectsDataService = class ProjectsDataService {
    constructor(usersRepository, projectRepository) {
        this.usersRepository = usersRepository;
        this.projectRepository = projectRepository;
    }
    async getAllProjects() {
        const projects = await this.projectRepository.find({});
        if (projects.length === 0) {
            throw new common_1.HttpException('No Projects found!', 404);
        }
        return class_transformer_1.plainToClass(show_project_dto_1.ShowProjectDTO, projects, {
            excludeExtraneousValues: true,
        });
    }
    async getProjectById(id) {
        const project = await this.projectRepository.findOne(id);
        if (!project) {
            throw new common_1.HttpException('No such Project found!', 404);
        }
        return class_transformer_1.plainToClass(show_project_dto_1.ShowProjectDTO, project, {
            excludeExtraneousValues: true,
        });
    }
    async createProject(body, user) {
        const projectEntity = this.projectRepository.create();
        projectEntity.due = body.due;
        projectEntity.title = body.title;
        projectEntity.description = body.description;
        const manager = await this.usersRepository.findOne(user.id);
        if (!manager) {
            throw new common_1.HttpException('No such manager found, please login!', 404);
        }
        projectEntity.manager = manager;
        const savedProject = await this.projectRepository.save(projectEntity);
        return class_transformer_1.plainToClass(show_project_dto_1.ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }
    async updateProject(id, body, user) {
        const oldProject = await this.projectRepository.findOne(id);
        if (!oldProject) {
            throw new common_1.HttpException('No such project found!', 404);
        }
        if (oldProject.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to edit this project!', 403);
        }
        const updatedProject = Object.assign(Object.assign({}, oldProject), body);
        const savedProject = await this.projectRepository.save(updatedProject);
        return class_transformer_1.plainToClass(show_project_dto_1.ShowProjectDTO, savedProject, {
            excludeExtraneousValues: true,
        });
    }
    async stopProject(id, user) {
        const foundProject = await this.projectRepository.findOne(id);
        if (!foundProject) {
            throw new common_1.HttpException('No such project found!', 404);
        }
        if (foundProject.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to stop this project!', 403);
        }
        foundProject.isStopped = true;
        const stoppedProject = await this.projectRepository.save(foundProject);
        return class_transformer_1.plainToClass(show_project_dto_1.ShowProjectDTO, stoppedProject, {
            excludeExtraneousValues: true,
        });
    }
};
ProjectsDataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ProjectsDataService);
exports.ProjectsDataService = ProjectsDataService;
//# sourceMappingURL=projects-data.service.js.map