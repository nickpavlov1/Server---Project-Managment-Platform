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
Object.defineProperty(exports, "__esModule", { value: true });
const requirement_entity_1 = require("./requirement.entity");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let Skill = class Skill extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Skill.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'nvarchar', nullable: false }),
    __metadata("design:type", String)
], Skill.prototype, "skillName", void 0);
__decorate([
    typeorm_1.ManyToOne(type => employee_entity_1.Employee, employee => employee.skillset),
    __metadata("design:type", employee_entity_1.Employee)
], Skill.prototype, "employee", void 0);
__decorate([
    typeorm_1.OneToMany(type => requirement_entity_1.Requirement, requirement => requirement.requiredSkill),
    __metadata("design:type", Array)
], Skill.prototype, "requirements", void 0);
Skill = __decorate([
    typeorm_1.Entity()
], Skill);
exports.Skill = Skill;
//# sourceMappingURL=skill.entity.js.map