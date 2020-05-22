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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = require("../models/dto/user/user.dto");
const user_decorator_1 = require("./../common/decorators/user.decorator");
const common_1 = require("@nestjs/common");
const projects_data_service_1 = require("./projects-data.service");
const create_project_dto_1 = require("./../models/dto/project/create-project.dto");
const show_project_dto_1 = require("../models/dto/project/show-project.dto");
const passport_1 = require("@nestjs/passport");
const blacklist_guard_1 = require("../common/guards/blacklist.guard");
let ProjectsController = class ProjectsController {
    constructor(projectsDataService) {
        this.projectsDataService = projectsDataService;
    }
    async getAllProjects() {
        return await this.projectsDataService.getAllProjects();
    }
    async createProject(user, body) {
        return await this.projectsDataService.createProject(body, user);
    }
    async getProjectById(id) {
        return await this.projectsDataService.getProjectById(id);
    }
    async updateProject(id, body, user) {
        return await this.projectsDataService.updateProject(id, body, user);
    }
    async stopProject(id, user) {
        return await this.projectsDataService.stopProject(id, user);
    }
};
__decorate([
    common_1.Get('projects'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProjectsController.prototype, "getAllProjects", null);
__decorate([
    common_1.Post('project'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_project_dto_1.CreateProjectDTO]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProjectsController.prototype, "createProject", null);
__decorate([
    common_1.Get('project/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProjectsController.prototype, "getProjectById", null);
__decorate([
    common_1.Put('project/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_project_dto_1.CreateProjectDTO, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    common_1.Delete('project/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProjectsController.prototype, "stopProject", null);
ProjectsController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [projects_data_service_1.ProjectsDataService])
], ProjectsController);
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects.controller.js.map