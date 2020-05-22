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
const user_entity_1 = require("../database/entities/user.entity");
const show_contribution_dto_1 = require("./../models/dto/contribution/show-contribution.dto");
const requirement_entity_1 = require("./../database/entities/requirement.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../database/entities/project.entity");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("../database/entities/skill.entity");
const create_requirement_dto_1 = require("../models/dto/requirement/create-requirement.dto");
const class_transformer_1 = require("class-transformer");
const show_requirement_dto_1 = require("../models/dto/requirement/show-requirement.dto");
const contribution_entity_1 = require("../database/entities/contribution.entity");
const employee_entity_1 = require("../database/entities/employee.entity");
let ContributionsDataService = class ContributionsDataService {
    constructor(employeesRepository, projectsRepository, skillsRepository, contributionsRepository, requirementsRepository) {
        this.employeesRepository = employeesRepository;
        this.projectsRepository = projectsRepository;
        this.skillsRepository = skillsRepository;
        this.contributionsRepository = contributionsRepository;
        this.requirementsRepository = requirementsRepository;
    }
    async createContribution(reqId, body, user) {
        const requirement = await this.requirementsRepository.findOne(reqId, { relations: ['project'] });
        if (!requirement) {
            throw new common_1.HttpException('No Such Requirement Found', 404);
        }
        if (requirement.project.manager.id !== user.id) {
            throw new common_1.HttpException('You dont have permission to add contributions to this project!', 403);
        }
        const employee = await this.employeesRepository.findOne({
            where: {
                email: body.userEmail
            }
        });
        if (!employee) {
            throw new common_1.HttpException('No Such Employee Found', 404);
        }
        const contributionEntity = this.contributionsRepository.create({
            dailyHourlyContribution: +body.dailyHourlyContribution
        });
        contributionEntity.contributor = employee;
        const savedContribution = await this.contributionsRepository.save(contributionEntity);
        requirement.contributions.push(savedContribution);
        const savedRequirement = await this.requirementsRepository.save(requirement);
        return class_transformer_1.plainToClass(show_contribution_dto_1.ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }
    async getAllContributions() {
        const contributions = await this.contributionsRepository.find({
            relations: ['requirement']
        });
        if (contributions.length === 0) {
            throw new common_1.HttpException('No Contributions found!', 404);
        }
        return class_transformer_1.plainToClass(show_contribution_dto_1.ShowContributionDTO, contributions, {
            excludeExtraneousValues: true,
        });
    }
    async getContributionById(id) {
        const foundContribution = await this.contributionsRepository.findOne(id, {
            relations: ['contributor']
        });
        if (foundContribution === undefined) {
            throw new common_1.HttpException('No such Contribution found!', 404);
        }
        return class_transformer_1.plainToClass(show_contribution_dto_1.ShowContributionDTO, foundContribution, {
            excludeExtraneousValues: true,
        });
    }
    async updateContribution(id, body) {
        const { dailyHourlyContribution } = body;
        const oldContribution = await this.contributionsRepository.findOne(id);
        if (dailyHourlyContribution) {
            oldContribution.dailyHourlyContribution = +dailyHourlyContribution;
        }
        const savedContribution = await this.contributionsRepository.save(oldContribution);
        return class_transformer_1.plainToClass(show_contribution_dto_1.ShowContributionDTO, savedContribution, {
            excludeExtraneousValues: true,
        });
    }
    async deleteContribution(id) {
        const foundContribution = await this.contributionsRepository.findOne(id);
        foundContribution.isDeleted = true;
        console.log(foundContribution);
        return this.contributionsRepository.save(Object.assign(Object.assign({}, foundContribution), { isDeleted: true }));
    }
};
ContributionsDataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(employee_entity_1.Employee)),
    __param(1, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(2, typeorm_1.InjectRepository(skill_entity_1.Skill)),
    __param(3, typeorm_1.InjectRepository(contribution_entity_1.Contribution)),
    __param(4, typeorm_1.InjectRepository(requirement_entity_1.Requirement)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], ContributionsDataService);
exports.ContributionsDataService = ContributionsDataService;
//# sourceMappingURL=contributions-data.service.js.map