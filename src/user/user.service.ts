import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { RoomService } from 'src/room/room.service';
import { Room } from 'src/room/entities/room.entity';
import { CreateRoomBookDto } from './dto/create-roombooking.dto';
import { Booking } from './entities/booking.entity';
import { UpdateRoomBookDto } from './dto/update-roombooking.dto';
import { ignoreElements } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly roomService: RoomService,
    @InjectRepository(Booking)
    private readonly roomBookRepo: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  async signup(email: string, password: string) {
    const hashedPass = await argon2.hash(password);
    const newUser = await this.userRepo.create({ email, password: hashedPass });
    if (!newUser) throw new NotFoundException('No data available');
    const duplicate = await this.userRepo.findOne({
      where: { email: newUser.email },
    });
    if (duplicate) throw new NotFoundException('Email already exist');
    return this.userRepo.save(newUser);
  }

  async signin(email: string, password: string) {
    const getUser = await this.userRepo.findOne({ where: { email: email } });
    if (!getUser) throw new NotFoundException('User Not Found');
    const verifyPass = await argon2.verify(getUser.password, password);
    if (!verifyPass) throw new NotFoundException('Wrong Input!');
    const token = sign({ email: email }, 'secret', { expiresIn: '10d' });
    return { token: token };
  }

  findAll() {
    return this.userRepo.find();
  }

  async availableRoom(currentUser) {
    if(!currentUser) throw new NotFoundException("You are not logedIn") 
    const onlyavailable = await this.roomRepo.find({where : {isAvailable : true}})    
    return onlyavailable
  }



  async roombook(createRoomBook: CreateRoomBookDto, curuser) {
    const roomNo = createRoomBook.roomno    
    const existingRoom = await this.roomRepo.findOne({where : {roomno : roomNo}})
    if(!existingRoom) throw new BadRequestException("Room doesn't exist")
    if(!existingRoom.isAvailable) throw new BadRequestException("Room is not available for booking")
    const newBooking = this.roomBookRepo.create(createRoomBook)
    existingRoom.isAvailable = false
    await this.roomRepo.save(existingRoom)
    // console.log("existingroom roombook",existingRoom);
    newBooking.user = curuser
    newBooking.room = existingRoom
    await this.roomBookRepo.save(newBooking)
    return `Room Booked Successfully! Room No. : ${newBooking.roomno} 
    Your Id :  ${newBooking.user.id} 
    Email : ${newBooking.user.email}`     
}


async checkout(updateRoomBook: UpdateRoomBookDto, curuser, id:string) {  
  const roomNo = updateRoomBook.roomno
  const existingRoom = await this.roomRepo.findOne({where : {roomno : roomNo}})
  if(!existingRoom) throw new BadRequestException("Room doesn't exist")
  const existingBooking = await this.roomBookRepo.findOne({where : {roomno : roomNo , status : true}})
  if(!existingBooking) throw new BadRequestException("Already checkedout")  

  const getOne = await this.roomBookRepo.findOne({where : {status : true}})
  console.log("getOne",getOne.user.id , id, curuser);
  if(getOne.user.id !== id || getOne.user.id !== curuser)throw new BadRequestException("Not Authorized")
  
  existingBooking.status = false
  existingRoom.isAvailable = true
  const updateRoom = await this.roomRepo.save(existingRoom)
  const updateBooking = await this.roomBookRepo.save(existingBooking)
  Object.assign(updateRoom,updateRoomBook)
  const trueRoomStatus = await this.roomRepo.save(updateRoom)
  return `Successfully Checkout! Room No. : ${updateBooking.roomno}
  Your Id :   ${updateBooking.user.id}
  Email : ${updateBooking.user.email}`
}


async userhistory(currentUser) {
  const getAll = await this.roomBookRepo.find({where : {user : currentUser} })
  if(getAll.length == 0 ) throw new NotFoundException("Not Available")
  return getAll
  
}

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id: id } });
  }

  
  async update(id: string, updateUserDto: UpdateUserDto, email: string) {
    const getOne = await this.userRepo.findOne({ where: { id: id } });
    const currentuseremaiInfo = await this.userRepo.findOne({
      where: { email: email },
    });
    if (getOne.email !== currentuseremaiInfo.email)
      throw new NotFoundException('You are not authorized');
    // console.log("currentuser from user service", currentUser);
    if (currentuseremaiInfo.id === id) {
      Object.assign(currentuseremaiInfo, updateUserDto);
      return this.userRepo.save(currentuseremaiInfo);
    } else {
      throw new NotFoundException('Not authorized to update the user');
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}


