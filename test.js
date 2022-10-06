// @Post('/signup')
// signup(@Body() body : {email : string, password : string}) {
//   const {email, password}  = body
//   return this.userService.signup(email,password);
// }

// @Post('/signin')
// signin(@Body() body : {email : string , password : string}) {
//   const {email, password} = body
//   return this.userService.signin(email,password);  
// }

// @UseGuards(AuthGurad)
// @Post('/roombook')
// roombook(@Body() createRoomBookDto : CreateRoomBookDto, @Req() req : any) {
//   const currentUser = req.user
//   return this.userService.roombook(createRoomBookDto, currentUser);
// }

// async signup(email: string, password: string) {
//     const hashedPass = await argon2.hash(password);
//     const newUser = await this.userRepo.create({ email, password: hashedPass });
//     if (!newUser) throw new NotFoundException('No data available');
//     const duplicate = await this.userRepo.findOne({
//       where: { email: newUser.email },
//     });
//     if (duplicate) throw new NotFoundException('Email already exist');
//     return this.userRepo.save(newUser);
//   }

//   async signin(email: string, password: string) {
//     const getUser = await this.userRepo.findOne({ where: { email: email } });
//     if (!getUser) throw new NotFoundException('User Not Found');
//     const verifyPass = await argon2.verify(getUser.password, password);
//     if (!verifyPass) throw new NotFoundException('Wrong Input!');
//     const token = sign({ email: email }, 'secret', { expiresIn: '10h' });
//     return { token: token };
//   }

// //   current user 

// import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
// import { InjectRepository} from '@nestjs/typeorm'
// import { Repository} from 'typeorm'
// import { User } from 'src/user/entities/user.entity'
// import { Observable } from 'rxjs'
// import { verify } from 'jsonwebtoken'


 
// export class AuthGurad implements CanActivate {
//     constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

//    async canActivate(context: ExecutionContext) {
//        const req =  context.switchToHttp().getRequest() 
//     //    console.log("req",req);
//        const[type, token] = req.headers.authorization.split(" ")        
//        if(!token) throw new UnauthorizedException('Token must be there')

//        try{
//         const payload = verify(token,'secret')
//         const email = payload['email']
//         const user = await this.userRepo.findOne({where : {email : email}})
//         req.user = user
//         return true
//        }
//        catch (err) {
//         throw new UnauthorizedException()
//        }
    
    
//     }

// }


// "@nestjs/common": "^8.0.0",
//     "@nestjs/core": "^8.0.0",
//     "@nestjs/mapped-types": "*",
//     "@nestjs/platform-express": "^8.0.0",
//     "@nestjs/typeorm": "^9.0.1",
//     "@types/jsonwebtoken": "^8.5.9",
//     "argon2": "^0.29.1",
//     "class-transformer": "^0.5.1",
//     "class-validator": "^0.13.2",
//     "jsonwebtoken": "^8.5.1",
//     "mysql2": "^2.3.3",
//     "reflect-metadata": "^0.1.13",
//     "rimraf": "^3.0.2",
//     "rxjs": "^7.2.0",
//     "typeorm": "^0.3.10"