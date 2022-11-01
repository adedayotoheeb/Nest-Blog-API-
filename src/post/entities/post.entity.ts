import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, BeforeInsert} from "typeorm";
import slugify from 'slugify'
import { Exclude } from "class-transformer";


@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar"})
    title: string;

    @Column({type:'text'})
    content: string;

    @Column({ type: 'varchar'})
    slug: string;

    @Column({type: 'varchar', default: 'null'})
    mainImageUrl: string;

    @Column({ default: 2})
    @Exclude()
    userId:number;

    @Column({ default: 3})
    @Exclude()
    categoryId:number;

    @ManyToOne(() => Category, (category) => category.post, { eager: true })
    @JoinColumn({
        name:'categoryId',
        referencedColumnName:'id'
    })
    category: Category;

    @ManyToOne(type => User, (user) => user.posts, { eager:true})
    @JoinColumn({
        name:'userId',
        referencedColumnName:'id'
    })
    user: User

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdOn:Date;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    modifiedOn:Date;

    @BeforeInsert()
    slugifyPost(){
        this.slug = slugify(this.title.substr(0,5), {
            lower:true,
            replacement:'_'
        })
    }

}
