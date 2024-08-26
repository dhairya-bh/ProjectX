import { CType } from "../constants/const";

export class AddCourseDto {
    courseName : string;
    courseType : CType;
    branchId : string;
    clgId : string;
    courseClgId : string;
}