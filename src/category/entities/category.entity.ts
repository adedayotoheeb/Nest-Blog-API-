import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar'})
    title:string;

    @Column({type:'text'})
    description:string;

    @OneToMany (() => Post, (post) => post.category)
    post: Post
}
