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
const user_dto_1 = require("./../user/user.dto");
const show_requirement_dto_1 = require("./../requirement/show-requirement.dto");
const requirement_entity_1 = require("../../../database/entities/requirement.entity");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../../database/entities/user.entity");
require("reflect-metadata");
class ShowProjectDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowProjectDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowProjectDTO.prototype, "title", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowProjectDTO.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ShowProjectDTO.prototype, "statusCompleted", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], ShowProjectDTO.prototype, "due", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ShowProjectDTO.prototype, "createdOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ShowProjectDTO.prototype, "updatedOn", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ShowProjectDTO.prototype, "isStopped", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => user_dto_1.UserDTO),
    __metadata("design:type", user_dto_1.UserDTO)
], ShowProjectDTO.prototype, "manager", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => show_requirement_dto_1.ShowRequirementDTO),
    __metadata("design:type", show_requirement_dto_1.ShowRequirementDTO)
], ShowProjectDTO.prototype, "requirements", void 0);
exports.ShowProjectDTO = ShowProjectDTO;
//# sourceMappingURL=show-project.dto.js.map