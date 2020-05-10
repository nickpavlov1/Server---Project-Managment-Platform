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
    public constructor(private readonly requirementsDataService: RequirementsDataService) { }

    @Get('project/:id/req')
    @HttpCode(HttpStatus.OK)
    public async getAllProjects(): Promise<ShowRequirementDTO[]> {
        return await this.requirementsDataService.getAllRequirements();
    }

    @Post('project/:id/req')
    @HttpCode(HttpStatus.CREATED)
    // @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async createRequirement(
        @Body() body: CreateRequirementDTO,
        // @User() user: ShowUserDTO,
    ): Promise<ShowRequirementDTO> {

        return await this.requirementsDataService.createRequirement(
            body,
            // user,
        );
    }

    @Get('project/:id/req/:reqId')
    @HttpCode(HttpStatus.OK)
    public async getProjectById(
        @Param('reqId') id: string,
    ): Promise<ShowRequirementDTO> {
        return await this.requirementsDataService.getRequirementById(id);
    }



}
