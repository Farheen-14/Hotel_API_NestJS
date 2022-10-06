import { Room } from "src/room/entities/room.entity";
import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from "typeorm";
import { Booking } from "./booking.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    email : string

    @Column()
    password : string

    @Column({default:false})
    isAdmin : boolean

    
    @OneToMany(type => Room, room => room.user)
    room : Room[]

    //one user can book multiple rooms
    @OneToMany(type => Booking, booking => booking.room)
    booking : Booking[]
}
