import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @Length(6,24)
    password:string;

}