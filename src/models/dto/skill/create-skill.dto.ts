import {  IsNotEmpty, IsArray } from 'class-validator';

export class CreateSkillSetDTO {

    @IsArray()
    @IsNotEmpty()
    skillSet: string[];
}