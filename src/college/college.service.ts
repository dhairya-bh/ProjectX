import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { College } from './entities/college.entity';
import { Repository } from 'typeorm';
import { AddBranchDto } from './dtos/addBranch.dto';
import { Branch } from './entities/branch.entity';
import { AddCourseDto } from './dtos/addCourse.dto';
import { Course } from './entities/course.entity';
import { CourseType } from './entities/courseType.entity';
import { AddAuthorDto } from './dtos/addAuthor.dto';
import { Author } from './entities/author.entity';
import { AddLinkDto } from './dtos/addLink.dto';
import { Link } from './entities/link.entity';

@Injectable()
export class CollegeService {
    constructor(@InjectRepository(College) private clgRepo:Repository<College>,
    @InjectRepository(Branch) private branchRepo:Repository<Branch>,
    @InjectRepository(Course) private courseRepo:Repository<Course>,
    @InjectRepository(CourseType) private courseTRepo:Repository<CourseType>,
    @InjectRepository(Author) private authRepo:Repository<Author>,
    @InjectRepository(Link) private linkRepo:Repository<Link>
    ){}

    async addClg(name : string){
        const newClg = await this.clgRepo.create({
            clgName:name
        })
        return await this.clgRepo.save(newClg);
    }

    async addBranch(data : AddBranchDto) {
        const newBranch = await this.branchRepo.create({
            branchName:data.branchName
        })
        const college = await this.clgRepo.findOneBy({clgId:data.clgId});
        newBranch.clg = college;
        return await this.branchRepo.save(newBranch);
    }

    async addCourse(data : AddCourseDto) {
        const newCourse = await this.courseRepo.create({
            courseName:data.courseName
        })
        const college = await this.clgRepo.findOneBy({clgId:data.clgId});
        newCourse.clg = college;
        newCourse.courseClgId = data.courseClgId;
        await this.courseRepo.save(newCourse);
        const branch = await this.branchRepo.findOneBy({branchId:data.branchId});
        const ctype = await this.courseTRepo.create({
            courseType:data.courseType,
        })
        ctype.clg = college;
        ctype.course = newCourse;
        ctype.branch = branch;
        return await this.courseTRepo.save(ctype);
    }

    async addAuthor(data : AddAuthorDto){
        const newAuth = await this.authRepo.create({
            authName:data.authName,
            authInfo:data.authInfo,
            authLinked:data.authLinked,
            authImg:data.authImg
        })
        return await this.authRepo.save(newAuth);
    }

    async addLink(data : AddLinkDto){
        const college = await this.clgRepo.findOneBy({clgId:data.clgId});
        const course = await this.courseRepo.findOneBy({courseId:data.courseId});
        const author = await this.authRepo.findOneBy({authId:data.authId});
        const newLink = await this.linkRepo.create({
            link:data.link,
            lpo:data.lpo,
        })
        newLink.clg = college;
        newLink.course = course;
        newLink.author = author;
        return await this.linkRepo.save(newLink);
    }

    async getColleges(){
        return await this.clgRepo.find({
            select:['clgId','clgName']
        })
    }

    async getBranches(clgId : string){
        return await this.branchRepo
            .createQueryBuilder('branch')
            .leftJoin('branch.clg','clg')
            .where('clg.clgId = :id',{id:clgId})
            .getMany()
    }

    async getCourses(clgId:string , branchId:string , type : string){
        return await this.courseTRepo.createQueryBuilder('c')
            .leftJoin('c.clg','clg')
            .leftJoin('c.branch','branch')
            .leftJoin('c.course','course')
            .where('clg.clgId = :id AND branch.branchId = :id1 AND c.courseType = :type',{id:clgId,id1:branchId,type})
            .select(['course.courseClgId as courseClgId','course.courseId as id','course.courseName as courseName'])
            .getRawMany()
    }

    async getLinks(clgId:string , courseId:string , lpo : string){
        console.log(clgId)
        return await this.linkRepo.createQueryBuilder('l')
            .leftJoin('l.clg','clg')                                                                      
            .leftJoin('l.course','course') 
            .leftJoin('l.author','author')
            .where('clg.clgId = :id AND course.courseId = :id1 AND l.lpo = :lpo',{id:clgId,id1:courseId,lpo}) //
            .select(['author.authName as authName','author.authInfo as authInfo',
                'author.authImg as authImg','author.authLinked as authLinkedIn','l.link as link'])
            .getRawMany()
    }

    async getCollegeIdFromName(clgName:string){
        return await this.clgRepo
        .createQueryBuilder('clg')
        .where('clg.clgName = :clgName',{clgName})
        .select(['clg.clgId as id'])
        .getRawMany()
    }
    async getBranchIdFromName(clgId:string, branchName:string){
        return await this.branchRepo
        .createQueryBuilder('branch')
        .where('branch.branchName = :branchName AND branch.clg.clgId = :clgId',{branchName,clgId})
        .select(['branch.branchId as id','branch.branchName as branchName'])
        .getRawMany()
    }

    async getCourseIdFromCourseClgId(clgId:string, courseClgId:string){
        return await this.courseRepo
        .createQueryBuilder('course')
        .where('course.courseClgId = :courseClgId AND course.clg.clgId = :clgId',{courseClgId,clgId})
        .select(['course.courseId as id','course.courseClgId as courseClgId'])
        .getRawMany()
    }
}
