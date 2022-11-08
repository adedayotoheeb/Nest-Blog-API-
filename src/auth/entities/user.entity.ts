import { Post } from "src/post/entities/post.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from'bcryptjs';
import * as argon from "argon2";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string;

    @Column( )
    lastname:string;

    @Column({ unique:true})
    email:string;

    @Column({type:'varchar'})
    @Exclude()
    password:string;

    @Column({nullable:true})
    profilePic:string;

    @OneToMany(() => Post,(post) => post.user)
    posts: Post[]
    

    @BeforeInsert()
    async hashPassword(){
        this.password = await argon.hash(this.password);
    }

    async comparePassword(attempt:string, userpassword:string){
            return await argon.verify(userpassword, attempt)
        }
}
