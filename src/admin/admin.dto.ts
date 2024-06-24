import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsEnum, IsPhoneNumber, IsInt } from 'class-validator';

enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export class AdminDTO {
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters long.' })
    @MaxLength(50, { message: 'Name cannot be longer than 50 characters.' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must be at least 3 characters long.' })
    @MaxLength(20, { message: 'Username cannot be longer than 20 characters.' })
    username: string;

    @IsEmail({}, { message: 'Invalid email address.' })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;

    @IsEnum(Gender, { message: 'Gender must be Male, Female, or Other.' })
    @IsNotEmpty({ message: 'Gender is required.' })
    gender: Gender;

    @IsPhoneNumber(null, { message: 'Invalid phone number.' })
    @IsNotEmpty({ message: 'Phone number is required.' })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: 'Address is required.' })
    address: string;
}
