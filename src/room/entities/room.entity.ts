import { Booking } from "src/user/entities/booking.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";


@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    roomno : number

    @Column()
    price : number

    @Column({type : Boolean})
    isAvailable : boolean    
    
    // @Column()
    // isAvailable : number

    //wrong  //correct bcz admin is posting so admin add the room and 1 admin can create many room
    @ManyToOne(() => User, user => user.room, {cascade : true, eager : true})
    user : User

    @OneToMany(type => Booking, booking => booking.room)
    room : Room[]

}
