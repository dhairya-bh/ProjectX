import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { College } from "./college.entity";
import { Course } from "./course.entity";
import { LPO } from "../constants/const";
import { Author } from "./author.entity";


@Entity()
export class Link {
    constructor(partial? : Partial<Link>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ManyToOne(()=>College,(clg)=>clg.clgId)
    clg:College;

    @ManyToOne(()=>Course,(course)=>course.courseId)
    course:Course;

    @ManyToOne(()=>Author,(auth)=>auth.authId)
    author:Author;

    @Column({nullable:true})
    lpo : LPO;

    @Column({nullable:true})
    link : string;
}