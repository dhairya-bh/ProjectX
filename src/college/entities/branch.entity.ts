import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { College } from "./college.entity";


@Entity()
export class Branch {
    constructor(partial? : Partial<Branch>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid',{name : 'branch_id'})
    branchId : string;

    @Column({ name: 'branch_name' ,nullable: true})
    branchName:string;

    @ManyToOne(()=> College,(college)=>college.clgId)
    clg: College;

}