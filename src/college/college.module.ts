import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { College } from './entities/college.entity';
import { Branch } from './entities/branch.entity';
import { Course } from './entities/course.entity';
import { CourseType } from './entities/courseType.entity';
import { Author } from './entities/author.entity';
import { Link } from './entities/link.entity';


@Module({
  imports: [TypeOrmModule.forFeature([College,Branch,Course,CourseType,Author,Link])],
  controllers: [CollegeController],
  providers: [CollegeService]
})
export class CollegeModule {}
