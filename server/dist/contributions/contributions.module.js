"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = require("./../database/entities/employee.entity");
const contribution_entity_1 = require("./../database/entities/contribution.entity");
const common_1 = require("@nestjs/common");
const contributions_controller_1 = require("./contributions.controller");
const contributions_data_service_1 = require("./contributions-data.service");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../database/entities/project.entity");
const skill_entity_1 = require("../database/entities/skill.entity");
const requirement_entity_1 = require("../database/entities/requirement.entity");
const user_entity_1 = require("../database/entities/user.entity");
let ContributionsModule = class ContributionsModule {
};
ContributionsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, skill_entity_1.Skill, contribution_entity_1.Contribution, requirement_entity_1.Requirement, employee_entity_1.Employee])],
        controllers: [contributions_controller_1.ContributionsController],
        providers: [contributions_data_service_1.ContributionsDataService]
    })
], ContributionsModule);
exports.ContributionsModule = ContributionsModule;
//# sourceMappingURL=contributions.module.js.map