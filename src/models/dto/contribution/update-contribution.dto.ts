import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateContributionDTO {
    @IsNotEmpty()
    @IsNumber()
    public dailyHourlyContribution: number;

    @IsOptional()
    @IsString()
    public contributionEnd: string;

    @IsOptional()
    public isDeleted: boolean;
}