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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const user_dto_1 = require("./../models/dto/user/user.dto");
const requirements_data_service_1 = require("./requirements-data.service");
const create_requirement_dto_1 = require("./../models/dto/requirement/create-requirement.dto");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("./../common/decorators/user.decorator");
const passport_1 = require("@nestjs/passport");
let RequirementsController = class RequirementsController {
    constructor(requirementsDataService) {
        this.requirementsDataService = requirementsDataService;
    }
    async getAllProjects(projectId) {
        return await this.requirementsDataService.getAllRequirements(projectId);
    }
    async createRequirement(projectId, body, user) {
        return await this.requirementsDataService.createRequirement(projectId, body, user);
    }
    async getRequirementById(id) {
        return await this.requirementsDataService.getRequirementById(id);
    }
    async updateRequirement(id, body, user) {
        return await this.requirementsDataService.updateRequirement(id, body, user);
    }
    async stopProject(reqId, user) {
        return await this.requirementsDataService.deleteRequirement(reqId, user);
    }
};
__decorate([
    common_1.Get('project/:id/req'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], RequirementsController.prototype, "getAllProjects", null);
__decorate([
    common_1.Post('project/:id/req'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_requirement_dto_1.CreateRequirementDTO,
        user_dto_1.UserDTO]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RequirementsController.prototype, "createRequirement", null);
__decorate([
    common_1.Get('req/:reqId'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('reqId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RequirementsController.prototype, "getRequirementById", null);
__decorate([
    common_1.Put('req/:reqId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('reqId')),
    __param(1, common_1.Body()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_requirement_dto_1.CreateRequirementDTO,
        user_dto_1.UserDTO]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RequirementsController.prototype, "updateRequirement", null);
__decorate([
    common_1.Delete('req/:reqId'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('reqId')),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDTO]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], RequirementsController.prototype, "stopProject", null);
RequirementsController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [requirements_data_service_1.RequirementsDataService])
], RequirementsController);
exports.RequirementsController = RequirementsController;
//# sourceMappingURL=requirements.controller.js.map