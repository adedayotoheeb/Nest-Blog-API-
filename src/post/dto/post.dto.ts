import { Expose } from "class-transformer";
import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";

export class PostDto {
    
    @Expose()
    id: number;

    @Expose()
    title:string;

    @Expose()
    content:string;

    @Expose()
    slug:string;

    @Expose()
    mainImageUrl: string;

    @Expose()
    user_id: number;

    @Expose()
    user: User;

    @Expose()
    category: Category;

    @Expose()
    createdOn:Date;

    @Expose()
    modifiedOn:Date;
}