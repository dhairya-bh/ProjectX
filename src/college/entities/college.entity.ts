import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Branch } from "./branch.entity";
import { Link } from "./link.entity";


@Entity()
export class College {
    constructor(partial? : Partial<College>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid',{name : 'clg_id'})
    clgId : string;

    @Column({ name: 'clg_name' ,nullable: true})
    clgName:string;

    @OneToMany(() => Branch,(branch)=>branch.clg)
    branches: Branch[];

    @OneToMany(()=> Link,(link)=>link.id)
    links : Link[];

}