import { IsOptional, IsString, MaxLength, IsEmail } from "class-validator";

export class EditUserDTO {
    @IsString()
    @MaxLength(20, { message: 'First name exceeds length limit'})
    @IsOptional()
    firstName: string;

    @IsString()
    @MaxLength(20, { message: 'Last name exceeds length limit'})
    @IsOptional()
    lastName: string;

    @IsString()
    @MaxLength(20, { message: 'Job title exceeds characters limit'})
    @IsOptional()
    jobTitle: string;

    @IsString()
    @MaxLength(200, { message: 'Job description exceeds characters limit'})
    @IsOptional()
    jobDescription: string;
    
    @IsString()
    @IsEmail()
    @IsOptional()
    directManager: string;
}