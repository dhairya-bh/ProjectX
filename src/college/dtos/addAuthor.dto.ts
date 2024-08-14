import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddAuthorDto {
    @IsString()
    @IsNotEmpty()
    authName : string;

    @IsString()
    @IsOptional()
    authInfo : string;

    @IsString()
    @IsOptional()
    authLinked : string;

    @IsString()
    @IsOptional()
    authImg : string;
}