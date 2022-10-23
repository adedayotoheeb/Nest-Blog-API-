import { IsEmail, IsNotEmpty, IsOptional, isString, IsString, Length } from "class-validator";
export class CreateAuthDto {
    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsEmail()
    email:string;

    @Length(8, 20)
    @IsNotEmpty()
    password:string;

    @IsOptional()
    profilePic:string;
}
