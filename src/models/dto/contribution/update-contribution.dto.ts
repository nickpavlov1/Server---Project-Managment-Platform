import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateContributionDTO {
    @IsNotEmpty()
    @IsNumber()
    public dailyHourlyContribution: number;

}