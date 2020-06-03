import { IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProjectDTO {
    @IsString()
    @Length(2, 50)
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    @IsNotEmpty()
    public userEmail: number;

    @IsString()
    public finishesOn: string;

    @IsString()
    @IsNotEmpty()
    public dueDate: string;

    @IsNumber()
    @IsNotEmpty()
    public dailyHourlyManagerContribution: number;
   
}
