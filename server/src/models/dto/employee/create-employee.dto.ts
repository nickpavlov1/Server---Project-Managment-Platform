import { IsString, IsEmail, IsNotEmpty, MaxLength, IsOptional, IsArray } from "class-validator";
import { Skill } from "src/database/entities/skill.entity";
import { SkillDTO } from "../skill/skill.dto";

export class CreateEmployeeDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(20, { message: 'First name exceeds length limit'})
    @IsNotEmpty({ message: 'Please provide your first name'})
    firstname: string;

    @IsString()
    @MaxLength(20, { message: 'Last name exceeds length limit'})
    @IsNotEmpty({ message: 'Please provide your last name'})
    lastname: string;

    @IsString()
    @MaxLength(20, { message: 'Job title exceeds characters limit'})
    @IsNotEmpty()
    jobTitle: string;

    @IsString()
    @MaxLength(200, { message: 'Job description exceeds characters limit'})
    @IsOptional()
    jobDescription: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    directManager: string;

    @IsString()
    @IsOptional()
    skillset: string;
}