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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const requirement_entity_1 = require("./../database/entities/requirement.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const show_requirement_dto_1 = require("./../models/dto/requirement/show-requirement.dto");
const skill_entity_1 = require("./../database/entities/skill.entity");
const project_entity_1 = require("../database/entities/project.entity");
let RequirementsDataService = class RequirementsDataService {
    constructor(requirementsRepository, skillsRepository, projectsRepository) {
        this.requirementsRepository = requirementsRepository;
        this.skillsRepository = skillsRepository;
        this.projectsRepository = projectsRepository;
    }
    async getAllRequirements(projectId) {
        const requirements = await this.requirementsRepository.find({
            where: { project: projectId }
        });
        if (requirements.length === 0) {
            throw new common_1.HttpException('No Requirements found!', 404);
        }
        return class_transformer_1.plainToClass(show_requirement_dto_1.ShowRequirementDTO, requirements, {
            excludeExtraneousValues: true,
        });
    }
    async getRequirementById(id) {
        const requirement = await this.requirementsRepository.findOne(id);
        if (!requirement) {
            throw new common_1.HttpException('No such Requirement found!', 404);
        }
        return class_transformer_1.plainToClass(show_requirement_dto_1.ShowRequirementDTO, requirement, {
            excludeExtraneousValues: true,
        });
    }
    async createRequirement(projectId, body, user) {
        const projectFound = await this.projectsRepository.findOne({
            where: { id: projectId },
        });
        if (projectFound.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to add requirements to this project!', 403);
        }
        const skillEntity = await this.skillsRepository.findOne({
            skillName: body.requiredSkill
        });
        if (!skillEntity) {
            throw new common_1.HttpException('No Such Skill Found', 404);
        }
        const reqEntity = this.requirementsRepository.create({
            requiredTime: body.requiredTime
        });
        reqEntity.requiredSkill = skillEntity;
        reqEntity.project = projectFound;
        const savedRequirement = await this.requirementsRepository.save(reqEntity);
        return class_transformer_1.plainToClass(show_requirement_dto_1.ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }
    async updateRequirement(id, body, user) {
        const { requiredTime } = body;
        const oldRequirement = await this.requirementsRepository.findOne(id, { relations: ['project'] });
        if (oldRequirement.project.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to change the requirements to this project!', 403);
        }
        oldRequirement.requiredTime = +requiredTime;
        const savedRequirement = await this.requirementsRepository.save(oldRequirement);
        return class_transformer_1.plainToClass(show_requirement_dto_1.ShowRequirementDTO, savedRequirement, {
            excludeExtraneousValues: true,
        });
    }
    async deleteRequirement(reqId, user) {
        const foundRequirement = await this.requirementsRepository.findOne(reqId, { relations: ['project'] });
        if (!foundRequirement) {
            throw new common_1.HttpException('No such requirement found!', 404);
        }
        if (foundRequirement.project.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to delete this requirement!', 403);
        }
        foundRequirement.isDeleted = true;
        const deletedRequirement = await this.requirementsRepository.save(foundRequirement);
        return class_transformer_1.plainToClass(show_requirement_dto_1.ShowRequirementDTO, deletedRequirement, {
            excludeExtraneousValues: true,
        });
    }
};
RequirementsDataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(requirement_entity_1.Requirement)),
    __param(1, typeorm_1.InjectRepository(skill_entity_1.Skill)),
    __param(2, typeorm_1.InjectRepository(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], RequirementsDataService);
exports.RequirementsDataService = RequirementsDataService;
//# sourceMappingURL=requirements-data.service.js.map