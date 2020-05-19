import { IsString, IsNotEmpty } from "class-validator";

export class CreateSkillDTO {

    @IsString()
    @IsNotEmpty()
    skillName: string;
}