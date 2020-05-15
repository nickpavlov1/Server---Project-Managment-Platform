import { Expose } from "class-transformer";

export class ShowSkillDTO {
    @Expose()
    id: string;

    @Expose()
    skillName: string; 
  }