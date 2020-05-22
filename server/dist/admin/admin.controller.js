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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const register_user_dto_1 = require("../models/dto/user/register-user.dto");
const user_dto_1 = require("../models/dto/user/user.dto");
const create_employee_dto_1 = require("../models/dto/employee/create-employee.dto");
const employee_dto_1 = require("../models/dto/employee/employee.dto");
const skill_dto_1 = require("../models/dto/skill/skill.dto");
const create_skill_dto_1 = require("../models/dto/skill/create-skill.dto");
const edit_user_dto_1 = require("../models/dto/user/edit-user.dto");
const edit_employee_dto_1 = require("../models/dto/employee/edit-employee.dto");
const platform_express_1 = require("@nestjs/platform-express");
const skill_entity_1 = require("../database/entities/skill.entity");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async registerUser(registerUserDTO) {
        return this.adminService.registerUser(registerUserDTO);
    }
    async createEmployee(createEmployeeDTO) {
        return this.adminService.createEmployee(createEmployeeDTO);
    }
    async addNewSkillToCatalog(createSkillDTO) {
        return this.adminService.addNewSkillToCatalog(createSkillDTO);
    }
    async changeUserWorkPosition(userId) {
        return this.adminService.changeUserWorkPosition(userId);
    }
    async changeUserProfileInfo(id, editUserInfo) {
        return this.adminService.changeUserProfileInfo(id, editUserInfo);
    }
    async changeEmployeeProfileInfo(id, editEmployeeInfo) {
        return this.adminService.changeEmployeeProfileInfo(id, editEmployeeInfo);
    }
    async changeUserManager(id, editUserDTO) {
        return this.adminService.changeUserManager(id, editUserDTO);
    }
    async changeEmployeeManager(id, editEmployeeDTO) {
        return this.adminService.changeEmployeeManager(id, editEmployeeDTO);
    }
    async addSkillToEmployeeSkillSet(id, newSkills) {
        return this.adminService.addSkillToEmployeeSkillSet(id, newSkills);
    }
    async uploadUserPicture(userId, file, oldAvatarUrl) {
        const userNewProperties = {
            avatarUrl: `http://localhost:3000/admin/avatar/` + file.filename,
        };
        if (oldAvatarUrl && oldAvatarUrl !== 'http://localhost:3000/admin/avatar/Profile_Icon.png') {
            this.adminService.deleteFile(oldAvatarUrl.split('/').pop());
        }
        return await this.adminService.updateUserProficePicture(userId, userNewProperties);
    }
    async uploadEmployeePicture(employeeId, file, oldAvatarUrl) {
        const employeeNewProperties = {
            avatarUrl: `http://localhost:3000/admin/avatar/` + file.filename,
        };
        if (oldAvatarUrl && oldAvatarUrl !== 'http://localhost:3000/admin/avatar/Profile_Icon.png') {
            this.adminService.deleteFile(oldAvatarUrl.split('/').pop());
        }
        return await this.adminService.updateEmployeeProficePicture(employeeId, employeeNewProperties);
    }
    async getFile(image, res) {
        return res.sendFile(image, { root: 'src/uploads/avatars' });
    }
    async getUserById(userId) {
        return this.adminService.getUserById(userId);
    }
    async getEmployeeById(employeeId) {
        return this.adminService.getEmployeeById(employeeId);
    }
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }
    async getAllEmployees() {
        return this.adminService.getAllEmployees();
    }
    async getSkillByName(name) {
        return this.adminService.getSkillByName(name);
    }
    async getSkillCatalog() {
        return this.adminService.getSkillCatalog();
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDTO]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AdminController.prototype, "registerUser", null);
__decorate([
    common_1.Post('/hire'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDTO]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AdminController.prototype, "createEmployee", null);
__decorate([
    common_1.Post('/skill'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_dto_1.AddSkillDTO]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminController.prototype, "addNewSkillToCatalog", null);
__decorate([
    common_1.Put('/change/position'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AdminController.prototype, "changeUserWorkPosition", null);
__decorate([
    common_1.Put('/change/user/:id'),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_user_dto_1.EditUserDTO]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AdminController.prototype, "changeUserProfileInfo", null);
__decorate([
    common_1.Put('/change/employee/:id'),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_employee_dto_1.EditEmployeeDTO]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AdminController.prototype, "changeEmployeeProfileInfo", null);
__decorate([
    common_1.Put('/change/user/manager/:id'),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_user_dto_1.EditUserDTO]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AdminController.prototype, "changeUserManager", null);
__decorate([
    common_1.Put('/change/employee/manager/:id'),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_employee_dto_1.EditEmployeeDTO]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AdminController.prototype, "changeEmployeeManager", null);
__decorate([
    common_1.Put('/:id/skill'),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_skill_dto_1.AddSkillDTO]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AdminController.prototype, "addSkillToEmployeeSkillSet", null);
__decorate([
    common_1.Post('avatar/user/:id'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Body('oldAvatarUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "uploadUserPicture", null);
__decorate([
    common_1.Post('avatar/employee/:id'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Param('id')),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Body('oldAvatarUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "uploadEmployeePicture", null);
__decorate([
    common_1.Get('avatar/:imgpath'),
    __param(0, common_1.Param('imgpath')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFile", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AdminController.prototype, "getUserById", null);
__decorate([
    common_1.Get('employee/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AdminController.prototype, "getEmployeeById", null);
__decorate([
    common_1.Get('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get('employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllEmployees", null);
__decorate([
    common_1.Get('/skill/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AdminController.prototype, "getSkillByName", null);
__decorate([
    common_1.Get('/skillcatalog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AdminController.prototype, "getSkillCatalog", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map