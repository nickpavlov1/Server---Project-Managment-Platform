import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequirementDTO {  
    @IsString()
    @IsNotEmpty()
    public requiredSkill: string;
  
    @IsNumber()
    public requiredTime: number;
    
}
