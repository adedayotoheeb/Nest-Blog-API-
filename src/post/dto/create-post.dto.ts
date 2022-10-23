import { IsString, IsOptional, IsNotEmpty, IsFQDN} from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsFQDN()
    mainImageUrl: string;

    @IsOptional()
    slug: string;
}
