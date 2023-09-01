import {IsInt, IsString, IsOptional, IsNotEmpty} from "class-validator"
import { Expose } from "class-transformer"
export class songDto{
    @Expose()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Expose()
    @IsInt()
    @IsNotEmpty()
    duration: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    artist: string;
    
}