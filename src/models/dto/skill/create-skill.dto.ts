import { IsString, IsNotEmpty } from "class-validator";

export class AddSkillDTO {

    @IsString()
    @IsNotEmpty()
    skillName: string;
}