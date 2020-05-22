"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const employee_repository_1 = require("./employee.repository");
const skill_repository_1 = require("./skill.repository");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        imports: [
            user_repository_1.UserRepository,
            employee_repository_1.EmployeeRepository,
            skill_repository_1.SkillRepository,
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository, employee_repository_1.EmployeeRepository, skill_repository_1.SkillRepository]),
            platform_express_1.MulterModule.register({
                fileFilter(_, file, cb) {
                    const ext = path_1.extname(file.originalname);
                    const allowedExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
                    if (!allowedExtensions.includes(ext)) {
                        return cb(new common_1.HttpException('Only images are allowed', 400), false);
                    }
                    cb(null, true);
                },
                storage: multer_1.diskStorage({
                    destination: './src/uploads/avatars',
                    filename: (_, file, cb) => {
                        const randomName = Array.from({ length: 32 })
                            .map(() => Math.round(Math.random() * 10))
                            .join('');
                        return cb(null, `${randomName}${path_1.extname(file.originalname)}`);
                    },
                }),
            }),
        ],
        providers: [admin_service_1.AdminService],
        controllers: [admin_controller_1.AdminController],
        exports: [user_repository_1.UserRepository]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map