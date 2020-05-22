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
const contribution_entity_1 = require("./contribution.entity");
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("./skill.entity");
const user_entity_1 = require("./user.entity");
let Employee = class Employee extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 'http://localhost:3000/admin/avatar/Profile_Icon.png' }),
    __metadata("design:type", String)
], Employee.prototype, "avatarUrl", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], Employee.prototype, "jobTitle", void 0);
__decorate([
    typeorm_1.Column('nvarchar', { nullable: true, default: null }),
    __metadata("design:type", String)
], Employee.prototype, "jobDescription", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ default: 'self-managed' }),
    __metadata("design:type", String)
], Employee.prototype, "directManager", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 8 }),
    __metadata("design:type", Number)
], Employee.prototype, "availableWorkHours", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Employee.prototype, "registeredOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Employee.prototype, "updatedOn", void 0);
__decorate([
    typeorm_1.ManyToMany(type => skill_entity_1.Skill, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Employee.prototype, "skillset", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.lastName, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Employee.prototype, "managedBy", void 0);
__decorate([
    typeorm_1.OneToMany(type => contribution_entity_1.Contribution, contribution => contribution.contributor),
    __metadata("design:type", Array)
], Employee.prototype, "contributions", void 0);
Employee = __decorate([
    typeorm_1.Entity()
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=employee.entity.js.map