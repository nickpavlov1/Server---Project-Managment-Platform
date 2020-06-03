import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Employee } from 'src/database/entities/employee.entity';

export class CreateContributionDTO {  
    @IsString()
    @IsNotEmpty()
    public userEmail: string;
  
    @IsNumber()
    public dailyHourlyContribution: number;

    public employee: Employee;

    @IsString()
    public contributionEnd: string;

    @IsString()
    public projectId: string;

    @IsString()
    public skillName: string;
    
}