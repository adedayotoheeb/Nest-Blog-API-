import { IsEnum, IsIn, IsOptional, IsString, } from "class-validator";
import { SortEnum} from "./sort.enum";
export class PostFilter {

    @IsOptional()
    @IsString()
    title:string;

    @IsOptional()
    @IsIn([SortEnum.ASC,SortEnum.DSC])
    sort:SortEnum;

    @IsOptional()
    @IsString()
    category:string;
}