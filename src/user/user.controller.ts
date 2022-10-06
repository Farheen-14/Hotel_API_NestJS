import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGurad } from 'src/authguard/authGuard';
import { RoomService } from 'src/room/room.service';
import { Repository } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';
import { CreateRoomBookDto } from './dto/create-roombooking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminGuard } from 'src/authguard/adminGuard';


@Controller('user')
export class UserController {
  constructor(@InjectRepository(Room) private readonly roomRepo : Repository<Room>,private readonly userService: UserService) {}

  @Post('/signup')
  signup(@Body() body : {email : string, password : string}) {
    const {email, password}  = body
    return this.userService.signup(email,password);
  }

  @Post('/signin')
  signin(@Body() body : {email : string , password : string}) {
    const {email, password} = body
    return this.userService.signin(email,password);  
  }

  @UseGuards(AuthGurad)
  @Post('/roombook')
  roombook(@Body() createRoomBookDto : CreateRoomBookDto, @Req() req : any) {
    const currentUser = req.user
    return this.userService.roombook(createRoomBookDto, currentUser);
  }

  @UseGuards(AuthGurad)
  @Post('/checkout')
    checkout(@Body() createRoomBookDto : CreateRoomBookDto, @Req() req : any, @Query('id') id : string) {
    const currentUser = req.user.id    
    return this.userService.checkout(createRoomBookDto, currentUser, id);
  }

  
  @UseGuards(AuthGurad)
  @Get('/availableRoom')
  availableRoom(@Req() req : any) {
    const currentUser = req.user.id
    return this.userService.availableRoom(currentUser);
  }

  @UseGuards(AuthGurad)
  @Get('/userhistory')
  userhistory(@Req() req : any) {
    const currentUser = req.user
    return this.userService.userhistory(currentUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGurad)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req : any ) {    
    const currentUser = req.user
    // console.log("currentUser from patch user",currentUser.email);
    return this.userService.update(id, updateUserDto, currentUser.email);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
