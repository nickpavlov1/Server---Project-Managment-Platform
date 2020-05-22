import { IsArray, IsOptional } from "class-validator";

export class AddSkillDTO {

    @IsArray()
    @IsOptional()
    skillSet: string[]
}