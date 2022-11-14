import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/core/users/dto/create.user.dto';
import { User } from 'src/core/users/users.model';
import { UsersService } from 'src/core/users/users.service';
import { AuthUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
      constructor (private userService: UsersService,
            private jwtService: JwtService) {}

      async login(userDto: CreateUserDto) {
            const user = await this.validateUser(userDto)
            return this.generateToken(user)
      }

      async register(userDto: CreateUserDto) {
            
            const candidate = await this.userService.getUserByUsername(userDto.username)
            if (candidate) {
                  throw new HttpException("User is already registred", HttpStatus.BAD_REQUEST);        
            }

            const hashPassword = await bcrypt.hash(userDto.password, 5);
            await this.userService.createUser({...userDto, password: hashPassword});
            const userData = await this.userService.getUserByUsername(userDto.username)
            return this.generateToken(userData)
      }

      async generateToken(user: User) {
            const payload = {userName: user.username, id: user.ID, roles: user.roles}
            console.log(payload);
            
            return {
                  token: this.jwtService.sign(payload)
            }
      }

      private async validateUser (userDto: CreateUserDto) {
            const user = await this.userService.getUserByUsername(userDto.username)
            const passwordEquals = await bcrypt.compare(userDto.password, user.password)
            if(user && passwordEquals) {
                  return user
            } 
            throw new UnauthorizedException({message: 'password or phone is not corrected!'}); 
      }
}
