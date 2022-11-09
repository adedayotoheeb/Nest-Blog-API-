import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @IsNotEmpty()
    firstname:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    lastname:string;

    @Length(6,24)
    password:string;
}