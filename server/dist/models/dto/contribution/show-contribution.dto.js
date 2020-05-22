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
const show_requirement_dto_1 = require("./../requirement/show-requirement.dto");
const employee_dto_1 = require("./../employee/employee.dto");
const employee_entity_1 = require("../../../database/entities/employee.entity");
const class_transformer_1 = require("class-transformer");
class ShowContributionDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowContributionDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], ShowContributionDTO.prototype, "dailyHourlyContribution", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ShowContributionDTO.prototype, "createdOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ShowContributionDTO.prototype, "updatedOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ShowContributionDTO.prototype, "isDeleted", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => employee_dto_1.EmployeeDTO),
    __metadata("design:type", employee_dto_1.EmployeeDTO)
], ShowContributionDTO.prototype, "contributor", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => show_requirement_dto_1.ShowRequirementDTO),
    __metadata("design:type", show_requirement_dto_1.ShowRequirementDTO)
], ShowContributionDTO.prototype, "requirement", void 0);
exports.ShowContributionDTO = ShowContributionDTO;
//# sourceMappingURL=show-contribution.dto.js.map