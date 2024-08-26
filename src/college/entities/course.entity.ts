import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { College } from "./college.entity";
import { Link } from "./link.entity";


@Entity()
export class Course {
    constructor(partial? : Partial<Course>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid',{name : 'course_id'})
    courseId : string;

    @Column({ name: 'course_name' ,nullable: true})
    courseName:string;

    @Column({ name: 'course_clg_id' ,nullable: false, unique: true})
    courseClgId:string;

    @ManyToOne(()=> College,(college)=>college.clgId)
    clg: College;

    @OneToMany(()=> Link,(link)=>link.id)
    links : Link[];

}