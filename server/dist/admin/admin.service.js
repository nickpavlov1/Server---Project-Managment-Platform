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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const register_user_dto_1 = require("../models/dto/user/register-user.dto");
const user_dto_1 = require("../models/dto/user/user.dto");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../database/entities/user.entity");
const class_transformer_1 = require("class-transformer");
const employee_repository_1 = require("./employee.repository");
const employee_entity_1 = require("../database/entities/employee.entity");
const employee_dto_1 = require("../models/dto/employee/employee.dto");
const skill_repository_1 = require("./skill.repository");
const skill_entity_1 = require("../database/entities/skill.entity");
const skill_dto_1 = require("../models/dto/skill/skill.dto");
const work_position_emun_1 = require("../models/enums/work-position.emun");
const edit_user_dto_1 = require("../models/dto/user/edit-user.dto");
const edit_employee_dto_1 = require("../models/dto/employee/edit-employee.dto");
const fs = require("fs");
const path = require("path");
let AdminService = class AdminService {
    constructor(userRepository, employeeRepository, skillRepository) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.skillRepository = skillRepository;
    }
    async registerUser(registerUserDTO) {
        const { password, email, firstName, lastName, jobTitle, jobDescription, directManager } = registerUserDTO;
        await this.userRepository.matchEmail(email);
        const setDirectManager = await this.userRepository.findOne({ where: { email: directManager } });
        const user = new user_entity_1.User();
        user.salt = await bcrypt.genSalt();
        user.email = email;
        user.jobTitle = jobTitle;
        user.jobDescription = jobDescription;
        user.password = await this.passwordHash(password, user.salt);
        user.firstName = firstName;
        user.lastName = lastName;
        if (setDirectManager) {
            user.directManager = setDirectManager.email;
        }
        const registerdUser = await user.save();
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, registerdUser, { excludeExtraneousValues: true });
    }
    async passwordHash(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async createEmployee(createEmployeeDTO) {
        const { email, firstName, lastName, jobTitle, jobDescription, directManager, skillset } = createEmployeeDTO;
        const providedSkillNames = skillset.split(', ');
        const validSkills = [];
        for (const skillName of providedSkillNames) {
            let skillEntity = await this.skillRepository.findOne({
                where: { skillName: skillName }
            });
            if (skillEntity) {
                validSkills.push(skillEntity);
            }
        }
        await this.employeeRepository.matchEmail(email);
        const setDirectManager = await this.userRepository.findOne({ where: { email: directManager } });
        const newEmployee = new employee_entity_1.Employee();
        newEmployee.email = email;
        newEmployee.jobTitle = jobTitle;
        newEmployee.jobDescription = jobDescription;
        newEmployee.firstName = firstName;
        newEmployee.lastName = lastName;
        newEmployee.skillset = validSkills;
        if (setDirectManager) {
            newEmployee.directManager = setDirectManager.email;
        }
        const createEmployee = await this.employeeRepository.save(newEmployee);
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, createEmployee, { excludeExtraneousValues: true });
    }
    async addNewSkillToCatalog(createSkillDTO) {
        const { skillName } = createSkillDTO;
        await this.skillRepository.matchExistingSkill(skillName);
        const skill = new skill_entity_1.Skill();
        skill.skillName = skillName;
        const addSkillToCatalog = await this.skillRepository.save(skill);
        return class_transformer_1.plainToClass(skill_dto_1.SkillDTO, addSkillToCatalog, { excludeExtraneousValues: true });
    }
    async changeUserWorkPosition(userId) {
        const user = await this.userRepository.findOne(userId);
        if (user && user.position === 'manager') {
            user.position = work_position_emun_1.WorkPosition.admin;
        }
        else if (user && user.position === 'admin') {
            user.position = work_position_emun_1.WorkPosition.manager;
        }
        const updatedUser = await user.save();
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, updatedUser, { excludeExtraneousValues: true });
    }
    async changeUserProfileInfo(userId, editUserInfo) {
        const { firstName, lastName, jobTitle, jobDescription } = editUserInfo;
        const user = await this.userRepository.findOne(userId);
        if (user) {
            user.jobTitle = jobTitle;
            user.jobDescription = jobDescription;
            user.firstName = firstName;
            user.lastName = lastName;
        }
        const updatedUser = await user.save();
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, updatedUser, { excludeExtraneousValues: true });
    }
    async changeEmployeeProfileInfo(employeeId, editEmployeeDTO) {
        const { firstName, lastName, jobTitle, jobDescription } = editEmployeeDTO;
        const employee = await this.employeeRepository.findOne(employeeId);
        if (employee) {
            employee.jobTitle = jobTitle;
            employee.jobDescription = jobDescription;
            employee.firstName = firstName;
            employee.lastName = lastName;
        }
        const updatedEmployee = await employee.save();
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, updatedEmployee, { excludeExtraneousValues: true });
    }
    async changeUserManager(userId, editUserDTO) {
        const { directManager } = editUserDTO;
        const user = await this.userRepository.findOne(userId);
        const newDirectManager = await this.userRepository.findOne({ where: { email: directManager } });
        if (user) {
            if (newDirectManager) {
                user.directManager = newDirectManager.email;
            }
        }
        const updatedUser = await user.save();
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, updatedUser, { excludeExtraneousValues: true });
    }
    async changeEmployeeManager(employeeId, editEmployeeDTO) {
        const { directManager } = editEmployeeDTO;
        const employee = await this.employeeRepository.findOne(employeeId);
        const newDirectManager = await this.userRepository.findOne({ where: { email: directManager } });
        if (employee) {
            if (newDirectManager) {
                employee.directManager = newDirectManager.email;
            }
        }
        const updatedEmployee = await employee.save();
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, updatedEmployee, { excludeExtraneousValues: true });
    }
    async addSkillToEmployeeSkillSet(employeeId, newSkills) {
        const employee = await this.employeeRepository.findOne(employeeId);
        const { skillName } = newSkills;
        const providedSkillNames = skillName.split(', ');
        const validSkills = [];
        for (const skillName of providedSkillNames) {
            let skillEntity = await this.skillRepository.findOne({
                where: { skillName: skillName }
            });
            if (skillEntity) {
                validSkills.push(skillEntity);
            }
        }
        if (!employee) {
            throw new common_1.BadRequestException(`Employee does not exist`);
        }
        employee.skillset = validSkills;
        const updatedEmployeeSkill = await employee.save();
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, updatedEmployeeSkill, { excludeExtraneousValues: true });
    }
    async updateUserProficePicture(userId, newAvatar) {
        const { avatarUrl } = newAvatar;
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new common_1.BadRequestException(`No manager found with these requirments`);
        }
        user.avatarUrl = avatarUrl;
        const updatedUser = await user.save();
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, updatedUser, { excludeExtraneousValues: true });
    }
    async updateEmployeeProficePicture(employeeId, newAvatar) {
        const { avatarUrl } = newAvatar;
        const employee = await this.employeeRepository.findOne(employeeId);
        if (!employee) {
            throw new common_1.BadRequestException(`No employee found  with these requirments`);
        }
        employee.avatarUrl = avatarUrl;
        const updatedEmployee = await employee.save();
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, updatedEmployee, { excludeExtraneousValues: true });
    }
    async deleteFile(imageName) {
        fs.unlink(path.join(__dirname, '../../src/uploads/', 'avatars/') + imageName, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('file deleted');
            }
        });
    }
    async getUserById(userId) {
        return await this.userRepository.viewUserById(userId);
    }
    async getEmployeeById(employeeId) {
        return await this.employeeRepository.viewEmployeeById(employeeId);
    }
    async getAllUsers() {
        const users = await this.userRepository.find();
        if (!users) {
            throw new common_1.BadRequestException('No users found');
        }
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, users, { excludeExtraneousValues: true });
    }
    async getAllEmployees() {
        const employees = await this.employeeRepository.find();
        if (!employees) {
            throw new common_1.BadRequestException('No employees found');
        }
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, employees, { excludeExtraneousValues: true });
    }
    async getSkillByName(skillName) {
        return this.skillRepository.getSkillByName(skillName);
    }
    async getSkillCatalog() {
        return this.skillRepository.find();
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        employee_repository_1.EmployeeRepository,
        skill_repository_1.SkillRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map