import { IsString, IsEmail, IsNotEmpty, MaxLength, IsOptional } from "class-validator";

export class CreateEmployeeDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(20, { message: 'First name exceeds length limit'})
    @IsNotEmpty({ message: 'Please provide your first name'})
    firstName: string;

    @IsString()
    @MaxLength(20, { message: 'Last name exceeds length limit'})
    @IsNotEmpty({ message: 'Please provide your last name'})
    lastName: string;

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
    @IsNotEmpty()
    directManager: string;

    @IsString()
    @IsOptional()
    skillset: string;
}