import { IsEmail, IsString, Length } from "class-validator";

export class RegisterUserDto {
    @IsString()
    username:string;

    @IsString()
    firstname:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    lastname:string;

    @Length(6,24)
    password:string;
}