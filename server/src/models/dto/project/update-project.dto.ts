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
    @IsNumber()
    public due: number;

}
