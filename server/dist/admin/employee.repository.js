"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = require("../database/entities/employee.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const employee_dto_1 = require("../models/dto/employee/employee.dto");
const class_transformer_1 = require("class-transformer");
let EmployeeRepository = class EmployeeRepository extends typeorm_1.Repository {
    async matchEmail(email) {
        const matchEmail = await this.findOne({
            where: { email: email }
        });
        if (matchEmail) {
            throw new common_1.ConflictException(`This email ${email} is already taken!`);
        }
    }
    async viewEmployeeById(employeeId) {
        const foundEmployee = await this.findOne(employeeId);
        if (!foundEmployee) {
            throw new common_1.NotFoundException(`Employee does not exist.`);
        }
        return class_transformer_1.plainToClass(employee_dto_1.EmployeeDTO, foundEmployee, { excludeExtraneousValues: true });
    }
};
EmployeeRepository = __decorate([
    typeorm_1.EntityRepository(employee_entity_1.Employee)
], EmployeeRepository);
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map