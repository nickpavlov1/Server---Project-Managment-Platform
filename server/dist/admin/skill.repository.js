"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("../database/entities/skill.entity");
const common_1 = require("@nestjs/common");
let SkillRepository = class SkillRepository extends typeorm_1.Repository {
    async matchExistingSkill(skillName) {
        const matchSkill = await this.findOne({
            where: { skillName: skillName }
        });
        if (matchSkill) {
            throw new common_1.ConflictException(`Skill ${skillName} exists in catalog.`);
        }
    }
    async getSkillByName(skillName) {
        return this.findOne({ where: { skillName: skillName } });
    }
};
SkillRepository = __decorate([
    typeorm_1.EntityRepository(skill_entity_1.Skill)
], SkillRepository);
exports.SkillRepository = SkillRepository;
//# sourceMappingURL=skill.repository.js.map