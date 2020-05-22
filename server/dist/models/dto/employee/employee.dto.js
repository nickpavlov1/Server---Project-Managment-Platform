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
const class_transformer_1 = require("class-transformer");
const skill_dto_1 = require("../skill/skill.dto");
class EmployeeDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "avatarUrl", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "firstName", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "lastName", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "jobTitle", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "jobDescription", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EmployeeDTO.prototype, "registered", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EmployeeDTO.prototype, "updated", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], EmployeeDTO.prototype, "availableWorkHours", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], EmployeeDTO.prototype, "directManager", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => skill_dto_1.SkillDTO),
    __metadata("design:type", skill_dto_1.SkillDTO)
], EmployeeDTO.prototype, "skillset", void 0);
exports.EmployeeDTO = EmployeeDTO;
//# sourceMappingURL=employee.dto.js.map