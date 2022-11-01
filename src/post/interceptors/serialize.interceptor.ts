import { UseInterceptors, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map , Observable} from "rxjs";
import { plainToClass } from "class-transformer";
import { PostDto } from "../dto/post.dto";


export class SerializeInterceptors implements NestInterceptor{ 
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>{
        return next.handle().pipe(
            map((data:any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues:true
                })
            })
        )
    }
}