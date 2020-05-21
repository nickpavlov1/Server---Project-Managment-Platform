import { UpdateContributionDTO } from './../models/dto/contribution/update-contribution.dto';
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
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/models/dto/user/user.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller()
export class ContributionsController {
    public constructor(
        private readonly requirementsDataService: ContributionsDataService
    ) { }

    @Post('requirement/:id/contribution')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    public async createContribution(
        @Param('id') reqId: string,
        @Body() body: CreateContributionDTO,
        @User() user: UserDTO,
    ) {
        return await this.requirementsDataService.createContribution(
            reqId,
            body,
            user,
        );
    }

    @Get('contributions')
    @HttpCode(HttpStatus.OK)
    public async getAllContributions(): Promise<ShowContributionDTO[]> {
        return await this.requirementsDataService.getAllContributions();
    }

    @Get('contribution/:id')
    @HttpCode(HttpStatus.OK)
    public async getContributionById(
        @Param('id') id: string,
    ): Promise<ShowContributionDTO> {
        return await this.requirementsDataService.getContributionById(id);
    }

    @Put('contribution/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    public async updateContribution(
        @Param('id') id: string,
        @Body() body: UpdateContributionDTO,
    ): Promise<ShowContributionDTO> {
        return await this.requirementsDataService.updateContribution(
            id,
            body,
        );
    }

    @Delete('contribution/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    public async deleteContribution(
      @Param('id') id: string,
    ) {
        return await this.requirementsDataService.deleteContribution(
            id,
        );
    }
}
