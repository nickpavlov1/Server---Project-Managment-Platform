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
const work_position_emun_1 = require("../../enums/work-position.emun");
class UserDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "avatarUrl", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "firstName", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "lastName", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "jobTitle", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "jobDescription", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserDTO.prototype, "registered", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserDTO.prototype, "updated", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "position", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], UserDTO.prototype, "directManager", void 0);
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map