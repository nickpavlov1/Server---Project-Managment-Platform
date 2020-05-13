import { ShowContributionDTO } from './../models/dto/contribution/show-contribution.dto';
import { CreateContributionDTO } from './../models/dto/contribution/create-contribution.dto';
import { ContributionsDataService } from './contributions-data.service';
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
export class ContributionsController {
    public constructor(
        private readonly requirementsDataService: ContributionsDataService
    ) { }

    @Post('requirement/:id/contribution')
    @HttpCode(HttpStatus.CREATED)
    // @UseGuards(AuthGuard('jwt'), AuthGuardWithBlacklisting)
    public async createContribution(
        @Param('id') reqId: string,
        @Body() body: CreateContributionDTO,
        // @User() user: ShowUserDTO,
    ): Promise<ShowContributionDTO> {

        return await this.requirementsDataService.createContribution(
            reqId,
            body,
            // user,
        );
    }

    @Get('requirement/:id/contribution')
    @HttpCode(HttpStatus.OK)
    public async getAllContributions(
        @Param('id') projectId: string,
    ): Promise<ShowContributionDTO[]> {
        return await this.requirementsDataService.getAllContributions(projectId);
    }
}
