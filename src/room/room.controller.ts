import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGurad } from 'src/authguard/authGuard';
import { AdminGuard } from 'src/authguard/adminGuard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGurad)
  @Post('/addroom')
  create(@Body() createRoomDto: CreateRoomDto, @Req() req : any ) {
    const user = req.user  
    const {id,isAdmin} = user 
    const newuser = {id,isAdmin}       
    return this.roomService.create(createRoomDto,newuser);
  }
 



  // @UseGuards(AdminGuard)
  @UseGuards(AuthGurad)
  @Get('/availableRoom')
  availableRoom(@Req() req : any) {
    const currentUser = req.user
    const {id}= currentUser
    const user = id    
    console.log("user",user);    
    return this.roomService.availableRoom(user);
  }

  
  // @Get('/:id')
  // findOne(@Param('id') id: string) {
  //   return this.roomService.findOne(id);
  // }


  @UseGuards(AdminGuard)
  @UseGuards(AuthGurad)
  @Patch('/updateroom/:id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @Req() req : any) {
    const user = req.user     
    return this.roomService.update(id, updateRoomDto,user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string,@Req() req : any) {
    const user = req.user    
    return this.roomService.remove(id,user);
  }
}
