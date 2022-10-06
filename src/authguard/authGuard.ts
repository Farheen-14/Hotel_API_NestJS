import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { Repository} from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Observable } from 'rxjs'
import { verify } from 'jsonwebtoken'


 
export class AuthGurad implements CanActivate {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

   async canActivate(context: ExecutionContext) {
       const req =  context.switchToHttp().getRequest() 
    //    console.log("req",req);
       const[type, token] = req.headers.authorization.split(" ")        
       if(!token) throw new UnauthorizedException('Token must be there')

       try{
        const payload = verify(token,'secret')
        const email = payload['email']
        const user = await this.userRepo.findOne({where : {email : email}})
        req.user = user
        return true
       }
       catch (err) {
        throw new UnauthorizedException()
       }
    
    
    }

}