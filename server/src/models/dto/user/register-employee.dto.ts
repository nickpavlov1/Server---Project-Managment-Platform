import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterEmployeeDTO {
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
}