import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host : 'localhost',
    username : 'root',
    password : 'root',
    port : 3306,
    database : 'hotel',
    autoLoadEntities : true,
    synchronize : true  
  }), UserModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
