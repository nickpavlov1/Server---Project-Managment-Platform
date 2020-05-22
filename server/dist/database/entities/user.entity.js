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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const project_entity_1 = require("./project.entity");
const work_position_emun_1 = require("../../models/enums/work-position.emun");
const employee_entity_1 = require("./employee.entity");
let User = class User extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 'http://localhost:3000/admin/avatar/Profile_Icon.png' }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], User.prototype, "jobTitle", void 0);
__decorate([
    typeorm_1.Column('nvarchar', { nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "jobDescription", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "registeredOn", void 0);
__decorate([
    typeorm_1.OneToMany(type => project_entity_1.Project, project => project.manager),
    __metadata("design:type", Array)
], User.prototype, "projects", void 0);
__decorate([
    typeorm_1.OneToMany(type => employee_entity_1.Employee, employee => employee.managedBy),
    __metadata("design:type", Array)
], User.prototype, "subordinates", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: work_position_emun_1.WorkPosition, default: work_position_emun_1.WorkPosition.manager }),
    __metadata("design:type", String)
], User.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 8 }),
    __metadata("design:type", Number)
], User.prototype, "availableWorkHours", void 0);
__decorate([
    typeorm_1.Column({ default: 'self-managed' }),
    __metadata("design:type", String)
], User.prototype, "directManager", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map