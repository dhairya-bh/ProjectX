import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";



@Entity()
export class Author {
    constructor(partial? : Partial<Author>){
        Object.assign(this,partial);
    }

    @PrimaryGeneratedColumn('uuid',{name : 'auth_id'})
    authId : string;

    @Column({ name: 'auth_name' ,nullable: true})
    authName:string;

    @Column({ name: 'auth_info' ,nullable: true})
    authInfo:string;

    @Column({ name: 'auth_img' ,nullable: true})
    authImg:string;

    @Column({ name: 'auth_linked_in' ,nullable: true})
    authLinked:string;

}