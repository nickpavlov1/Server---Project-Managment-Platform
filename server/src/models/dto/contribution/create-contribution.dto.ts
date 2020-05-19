import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContributionDTO {  
    @IsString()
    @IsNotEmpty()
    public userEmail: string;
  
    @IsNumber()
    public dailyHourlyContribution: number;
    
}