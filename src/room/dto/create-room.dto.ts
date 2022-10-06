import { IsBoolean } from "class-validator"
import { User } from "src/user/entities/user.entity"

export class CreateRoomDto {

    roomno : number
    isAvailable : boolean

    // user : User //check 

}
