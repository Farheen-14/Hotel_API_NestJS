import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/user/user.module';
import {TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entities/user.entity';
import { Room } from './entities/room.entity';
import { Booking } from 'src/user/entities/booking.entity';


@Module({
  imports : [TypeOrmModule.forFeature([User,Room,Booking])],
  controllers: [RoomController],
  providers: [RoomService],
  exports : [RoomService]
})
export class RoomModule {}
