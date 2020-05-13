import { RequirementsDataService } from './requirements-data.service';
import { ShowRequirementDTO } from './../models/dto/requirement/show-requirement.dto';
import { CreateRequirementDTO } from './../models/dto/requirement/create-requirement.dto';
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
    // @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async createRequirement(
        @Param('id') projectId: string,
        @Body() body: CreateRequirementDTO,
        // @User() user: ShowUserDTO,
    ) {

        return await this.requirementsDataService.createRequirement(
            projectId,
            body,
            // user,
        );
    }

    @Get('project/:id/req/:reqId')
    @HttpCode(HttpStatus.OK)
    public async getRequirementById(
        @Param('reqId') id: string,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.getRequirementById(id);
    }

    @Put('project/:id/req/:reqId')
    // @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    public async updateRequirement(
        // @User() user,
        @Param('reqId') id: string,
        @Body() body: CreateRequirementDTO,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.updateRequirement(
            id,
            body,
            // user,
        );
    }

}
