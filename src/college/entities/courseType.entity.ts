import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { College } from "./college.entity";
import { Course } from "./course.entity";
import { CType, LPO } from "../constants/const";
import { Branch } from "./branch.entity";


@Entity()
export class CourseType {
    constructor(partial? : Partial<CourseType>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    courseType : CType;

    @ManyToOne(()=>College,(clg)=>clg.clgId)
    clg:College;

    @ManyToOne(()=>Course,(course)=>course.courseId)
    course:Course;

    @ManyToOne(()=>Branch,(branch)=>branch.branchId)
    branch:Branch;
    
}