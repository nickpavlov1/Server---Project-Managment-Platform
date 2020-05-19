import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
        { message: 'Password is too weak!' }
    )
    password: string;
    
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
}