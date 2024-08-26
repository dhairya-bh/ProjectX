import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CollegeService } from './college.service';
import { AddBranchDto } from './dtos/addBranch.dto';
import { AddCourseDto } from './dtos/addCourse.dto';
import { AddAuthorDto } from './dtos/addAuthor.dto';
import { AddLinkDto } from './dtos/addLink.dto';

@Controller('college')
export class CollegeController {
  constructor(private clgService: CollegeService) {}

  @Post('addCollege')
  async addCollege(@Body() body: { name: string }) {
    return await this.clgService.addClg(body.name);
  }

  @Post('addBranch')
  async addBranch(@Body() body: AddBranchDto) {
    return await this.clgService.addBranch(body);
  }

  @Post('addCourse')
  async addC(@Body() body: AddCourseDto) {
    return await this.clgService.addCourse(body);
  }

  @Post('addAuthor')
  async addAuthor(@Body() body: AddAuthorDto) {
    return await this.clgService.addAuthor(body);
  }

  @Post('addLink')
  async addLink(@Body() body: AddLinkDto) {
    return await this.clgService.addLink(body);
  }

  @Get('getColleges')
  async getColleges() {
    return await this.clgService.getColleges();
  }

  @Get('getBranches/:id')
  async getBranches(@Param('id') id: string) {
    return await this.clgService.getBranches(id);
  }

  @Get('getCourses/:collegeId/:branchId/:type')
  async getCourses(
    @Param('collegeId') collegeId: string,
    @Param('branchId') branchId: string,
    @Param('type') type : string
  ) {
    return await this.clgService.getCourses(collegeId, branchId,type);
  }
  @Get('getLinks/:collegeId/:courseId/:lpo')
  async getLinks(
    @Param('collegeId') collegeId: string,
    @Param('courseId') courseId: string,
    @Param('lpo') lpo : string
  ) {
    console.log("idhar pahoncha")
    return await this.clgService.getLinks(collegeId, courseId, lpo);
  }

  @Get('getClgId/:clgName')
  async getCollegeIdFromName(
    @Param('clgName') clgName: string
  ) {
    return await this.clgService.getCollegeIdFromName(clgName);
  }
  @Get('getBranchId/:clgName/:branchName')
  async getBranchIdFromName(
    @Param('clgName') clgName: string,
    @Param('branchName') branchName: string
  ) {
    var clgId = await this.clgService.getCollegeIdFromName(clgName); 
    return await this.clgService.getBranchIdFromName(clgId[0].id,branchName);
  }
  @Get('getCourseId/:clgName/:courseClgId')
  async getCouseIdFromCourseClgId(
    @Param('clgName') clgName: string,
    @Param('courseClgId') courseClgId: string
  ) {
    var clgId = await this.clgService.getCollegeIdFromName(clgName);
    return await this.clgService.getCourseIdFromCourseClgId(clgId[0].id,courseClgId);
  }

}
