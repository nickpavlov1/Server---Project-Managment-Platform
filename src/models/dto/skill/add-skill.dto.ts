import { IsOptional, IsString } from 'class-validator';

export class AddSkillDTO {

    @IsString()
    @IsOptional()
    skillName: string;
}