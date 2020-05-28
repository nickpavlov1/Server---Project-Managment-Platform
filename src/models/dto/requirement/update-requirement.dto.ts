import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRequirementDTO {  
    @IsNumber()
    @IsNotEmpty()
    public requiredTime: number;

    @IsString()
    public requirementEnd: string;
}
