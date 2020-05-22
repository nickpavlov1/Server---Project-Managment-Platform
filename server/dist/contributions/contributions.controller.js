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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const update_contribution_dto_1 = require("./../models/dto/contribution/update-contribution.dto");
const create_contribution_dto_1 = require("./../models/dto/contribution/create-contribution.dto");
const contributions_data_service_1 = require("./contributions-data.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_dto_1 = require("../models/dto/user/user.dto");
const user_decorator_1 = require("../common/decorators/user.decorator");
let ContributionsController = class ContributionsController {
    constructor(requirementsDataService) {
        this.requirementsDataService = requirementsDataService;
    }
    async createContribution(reqId, body, user) {
        return await this.requirementsDataService.createContribution(reqId, body, user);
    }
    async getAllContributions() {
        return await this.requirementsDataService.getAllContributions();
    }
    async getContributionById(id) {
        return await this.requirementsDataService.getContributionById(id);
    }
    async updateContribution(id, body) {
        return await this.requirementsDataService.updateContribution(id, body);
    }
    async deleteContribution(id) {
        return await this.requirementsDataService.deleteContribution(id);
    }
};
__decorate([
    common_1.Post('requirement/:id/contribution'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_contribution_dto_1.CreateContributionDTO,
        user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "createContribution", null);
__decorate([
    common_1.Get('contributions'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ContributionsController.prototype, "getAllContributions", null);
__decorate([
    common_1.Get('contribution/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ContributionsController.prototype, "getContributionById", null);
__decorate([
    common_1.Put('contribution/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contribution_dto_1.UpdateContributionDTO]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ContributionsController.prototype, "updateContribution", null);
__decorate([
    common_1.Delete('contribution/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContributionsController.prototype, "deleteContribution", null);
ContributionsController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [contributions_data_service_1.ContributionsDataService])
], ContributionsController);
exports.ContributionsController = ContributionsController;
//# sourceMappingURL=contributions.controller.js.map