"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const skill_entity_1 = require("./../database/entities/skill.entity");
const requirement_entity_1 = require("./../database/entities/requirement.entity");
const common_1 = require("@nestjs/common");
const requirements_controller_1 = require("./requirements.controller");
const requirements_data_service_1 = require("./requirements-data.service");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../database/entities/project.entity");
let RequirementsModule = class RequirementsModule {
};
RequirementsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([requirement_entity_1.Requirement, skill_entity_1.Skill, project_entity_1.Project])],
        controllers: [requirements_controller_1.RequirementsController],
        providers: [requirements_data_service_1.RequirementsDataService]
    })
], RequirementsModule);
exports.RequirementsModule = RequirementsModule;
//# sourceMappingURL=requirements.module.js.map