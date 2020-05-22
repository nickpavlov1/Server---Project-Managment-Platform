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
const show_project_dto_1 = require("../project/show-project.dto");
const show_contribution_dto_1 = require("./../contribution/show-contribution.dto");
const class_transformer_1 = require("class-transformer");
const skill_dto_1 = require("./../../../models/dto/skill/skill.dto");
class ShowRequirementDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRequirementDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ShowRequirementDTO.prototype, "statusCompleted", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], ShowRequirementDTO.prototype, "requiredTime", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], ShowRequirementDTO.prototype, "totalContributedTime", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], ShowRequirementDTO.prototype, "totalDailyWorkInput", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ShowRequirementDTO.prototype, "createdOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ShowRequirementDTO.prototype, "updatedOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ShowRequirementDTO.prototype, "isDeleted", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => skill_dto_1.SkillDTO),
    __metadata("design:type", skill_dto_1.SkillDTO)
], ShowRequirementDTO.prototype, "requiredSkill", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => show_contribution_dto_1.ShowContributionDTO),
    __metadata("design:type", show_contribution_dto_1.ShowContributionDTO)
], ShowRequirementDTO.prototype, "contributions", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => show_project_dto_1.ShowProjectDTO),
    __metadata("design:type", show_project_dto_1.ShowProjectDTO)
], ShowRequirementDTO.prototype, "project", void 0);
exports.ShowRequirementDTO = ShowRequirementDTO;
//# sourceMappingURL=show-requirement.dto.js.map