import { IsString, MaxLength, IsOptional, IsEmail } from "class-validator";
import { User } from "src/database/entities/user.entity";

export class EditEmployeeDTO {
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