import { IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProjectDTO {
    @IsString()
    @Length(2, 50)
    public title: string;

    @IsString()
    public description: string;

    @IsNumber()
    @IsNotEmpty()
    public due: number;

    @IsString()
    @IsNotEmpty()
    public userEmail: number;

    @IsString()
    public finishesOn: string;

    @IsNumber()
    @IsNotEmpty()
    public dailyHourlyManagerContribution: number;
   
}
