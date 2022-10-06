import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRoomBookDto } from './create-roombooking.dto';


export class UpdateRoomBookDto extends PartialType(CreateRoomBookDto) {
    
    roomno : number

    @IsOptional()
    status : boolean

    // @IsNotEmpty()
    // @IsOptional()
    // checkout? : boolean

}
