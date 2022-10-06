import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmModule} from ''
import { User } from './entities/user.entity';
import { RoomModule } from 'src/room/room.module';
import { Room } from 'src/room/entities/room.entity';
import { Booking } from './entities/booking.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User,Room,Booking]),RoomModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
