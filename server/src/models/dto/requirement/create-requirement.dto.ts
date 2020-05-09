import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequirementDTO {  
    @IsString()
    @IsNotEmpty()
    public skill: string;
  
    @IsNumber()
    public requiredTime: number;
}
