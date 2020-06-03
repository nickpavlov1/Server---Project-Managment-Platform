import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class UpdateProjectDTO {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    public title: string;

    @IsOptional()
    @IsString()
    public description: string;

    @IsOptional()
    @IsString()
    public finishesOn: string;

    @IsOptional()
    @IsString()
    public dueDate: string;

    @IsOptional()
    @IsNumber()
    public dailyHourlyManagerContribution: number;

}
