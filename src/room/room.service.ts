import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import  {InjectRepository} from '@nestjs/typeorm'
import { Room } from './entities/room.entity';
import {Repository} from 'typeorm'
import { UserService } from 'src/user/user.service';
import { Booking } from 'src/user/entities/booking.entity';
@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly roomRepo : Repository<Room> ,
  @InjectRepository(Booking) 
  private readonly bookingRepo : Repository<Booking>) {}

  async create(createRoomDto: CreateRoomDto, user) {
    const findRoom = await this.roomRepo.findOne({where : {roomno : createRoomDto.roomno}})
    if(findRoom) throw new NotFoundException("Room already exist")
    const createRoom = await this.roomRepo.create(createRoomDto)
    // if(!createRoom) throw new NotFoundException("Sorry! No data available")
    if(!user || user == null) throw new  NotFoundException ("User not available")
    createRoom.user = user
    return this.roomRepo.save(createRoom);
  }

  findAll() {
    return this.roomRepo.find()
  }

  //working
  async availableRoom(currentUser) {
    if(!currentUser) throw new NotFoundException("You are not logedIn") 
    const onlyavailable = await this.roomRepo.find({where : {isAvailable : true}})    
    return onlyavailable
  }


  async update(id: string, updateRoomDto: UpdateRoomDto, user) {
    const getOne = await this.roomRepo.findOne({where : {id : id}})
    if(!getOne) throw new BadRequestException("Wrong Input")
    if(!getOne.user.id === user.id) throw new  NotFoundException ("Not Authorized")
    Object.assign(getOne,updateRoomDto)
    const data = await this.roomRepo.save(getOne)
    return "Updated Successfully"
  }


  async remove(id: string, user) {
    if(user.isAdmin !== true) throw new NotFoundException("Sorry! You are not authorized")
    const getOne = await this.roomRepo.findOne({where : {id : id}})
    if(!getOne) throw new NotFoundException("Wrong Input")
    if(!user || user == null) throw new  NotFoundException ("User Not Available")
    if(!getOne.user.id === user.id) throw new  NotFoundException ("Not Authorized")
    const removeData = await this.roomRepo.remove(getOne)
    if(removeData) return "Data removed"
    return "Getting error"
  }



  // async findOne(id: string) {
  //   const getOne = await this.roomRepo.find({where : {id : id}})
  //   if(getOne.length == 0)throw new NotFoundException("Not Found") 
  //   if(!getOne) throw new NotFoundException("No Room Available")
  //   return getOne 
  // }

}
