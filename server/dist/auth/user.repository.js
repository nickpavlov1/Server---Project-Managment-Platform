"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../models/dto/user/user.dto");
const class_transformer_1 = require("class-transformer");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async viewUserById(userId) {
        const foundUser = await this.findOne(userId);
        if (!foundUser) {
            throw new common_1.NotFoundException(`User does not exist.`);
        }
        return class_transformer_1.plainToClass(user_dto_1.UserDTO, foundUser, { excludeExtraneousValues: true });
    }
    async matchEmail(email) {
        const matchEmail = await this.findOne({
            where: { email: email }
        });
        if (matchEmail) {
            throw new common_1.ConflictException(`This email ${email} is already taken!`);
        }
    }
    async validateUserPassword(loginUserDTO) {
        const matchUser = loginUserDTO;
        const user = await this.findOne({
            where: { email: matchUser.email }
        });
        if (user && await user.validatePassword(matchUser.password)) {
            return matchUser.email;
        }
        else {
            return null;
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map