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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const contribution_entity_1 = require("./contribution.entity");
const skill_entity_1 = require("./skill.entity");
let Requirement = class Requirement {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Requirement.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Requirement.prototype, "statusCompleted", void 0);
__decorate([
    typeorm_1.ManyToOne(type => skill_entity_1.Skill, skill => skill.requirements, { eager: true }),
    __metadata("design:type", skill_entity_1.Skill)
], Requirement.prototype, "requiredSkill", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Requirement.prototype, "requiredTime", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Requirement.prototype, "totalContributedTime", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Requirement.prototype, "totalDailyWorkInput", void 0);
__decorate([
    typeorm_1.ManyToOne(type => project_entity_1.Project, project => project.requirements),
    __metadata("design:type", project_entity_1.Project)
], Requirement.prototype, "project", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Requirement.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Requirement.prototype, "updatedOn", void 0);
__decorate([
    typeorm_1.OneToMany(type => contribution_entity_1.Contribution, contribution => contribution.requirement, { eager: true }),
    __metadata("design:type", Array)
], Requirement.prototype, "contributions", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Requirement.prototype, "isDeleted", void 0);
Requirement = __decorate([
    typeorm_1.Entity('requirement')
], Requirement);
exports.Requirement = Requirement;
//# sourceMappingURL=requirement.entity.js.map