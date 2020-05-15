import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContributionDTO {  
    @IsString()
    @IsNotEmpty()
    public email: string;
  
    @IsNumber()
    public dailyHourlyContribution: number;
    
}