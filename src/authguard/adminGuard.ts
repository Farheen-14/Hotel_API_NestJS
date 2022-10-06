import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { Repository} from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Observable } from 'rxjs'
import { verify } from 'jsonwebtoken'

 
export class AdminGuard implements CanActivate {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

    canActivate(context: ExecutionContext) {
        try {
            const req =  context.switchToHttp().getRequest() 
            if(!req.user.isAdmin) throw new UnauthorizedException()
            return req.user.isAdmin;

        }
        catch(err){
            throw new UnauthorizedException()
        }
    
    
    }

}