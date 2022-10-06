import { IsOptional } from "class-validator"
import { Room } from "src/room/entities/room.entity"
import { Booking } from "../entities/booking.entity"
import { User } from "../entities/user.entity"


export class CreateRoomBookDto {

    roomno : number

    @IsOptional()
    status : boolean
    
    // @IsOptional()
    // checkout? : boolean

    user : User

    roomid : Booking

}