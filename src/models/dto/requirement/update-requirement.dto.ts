import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRequirementDTO {  
    @IsNumber()
    @IsNotEmpty()
    public requiredTime: number;

}
