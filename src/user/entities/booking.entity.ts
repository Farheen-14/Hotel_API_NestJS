import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";


@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    roomno : number

    @Column()
    status : boolean

    // @Column()
    // checkout : boolean

    @ManyToOne(() => User, user => user.booking, {cascade : true, eager : true})
    user : User

    @ManyToOne(() => Room, room => room.room, {cascade : true, eager : true})
    room : Room

}


