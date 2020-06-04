import { UserDTO } from '../models/dto/user/user.dto';
import { RequirementsDataService } from './requirements-data.service';
import { ShowRequirementDTO } from '../models/dto/requirement/show-requirement.dto';
import { CreateRequirementDTO } from '../models/dto/requirement/create-requirement.dto';
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
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class RequirementsController {
    public constructor(
        private readonly requirementsDataService: RequirementsDataService
    ) { }

    @Get('project/:id/req')
    @HttpCode(HttpStatus.OK)
    public async getAllProjects(
        @Param('id') projectId: string,
    ): Promise<ShowRequirementDTO[]> {
        return await this.requirementsDataService.getAllRequirements(projectId);
    }
 
    @Post('project/:id/req')
    @HttpCode(HttpStatus.CREATED)
    // @UseGuards(AuthGuard('jwt'))
    public async createRequirement(
        @Param('id') projectId: string,
        @Body() body: CreateRequirementDTO,
        @User() user: UserDTO,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.createRequirement(
            projectId,
            body,
            user,
        );
    }

    @Get('req/:reqId')
    @HttpCode(HttpStatus.OK)
    public async getRequirementById(
        @Param('reqId') id: string,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.getRequirementById(id);
    }

    @Put('req/:reqId')
    // @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async updateRequirement(
        @Param('reqId') id: string,
        @Body() body: CreateRequirementDTO,
        @User() user: UserDTO,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.updateRequirement(
            id,
            body,
            user,
        );
    }

    @Delete('req/:reqId')
    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'))
    public async stopProject(
        @Param('reqId') reqId: string,
        @User() user: UserDTO,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.deleteRequirement(
            reqId,
            user,
        );
    }
}
