import { Expose } from "class-transformer";

export class SkillDTO {
    @Expose()
    skillName: string;
}