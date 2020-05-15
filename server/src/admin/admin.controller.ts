import { CreateSkillDTO } from '../models/dto/skill/create-skill.dto';
import { AdminService } from './admin.service';
import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Body,
    Query,
    Put,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';

@Controller()
export class AdminController {
    public constructor(
        private readonly adminDataService: AdminService
    ) { }

    @Post('skill')
    @HttpCode(HttpStatus.CREATED)
    public async createSkill(
        @Body() body: CreateSkillDTO,
    ) {
        return await this.adminDataService.createSkill(body);
    }


}
