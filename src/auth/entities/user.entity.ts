import { Post } from "src/post/entities/post.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from'bcryptjs';
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column()
    profilePic:string;

    @OneToMany(() => Post,(post) => post.user)
    posts: Post[]

    @BeforeInsert()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,12);
    }
}
