import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/core/users/dto/create.user.dto';
import { User } from 'src/core/users/users.model';
import { UsersService } from 'src/core/users/users.service';
import { AuthUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
      constructor (private userService: UsersService,
            private jwtService: JwtService,
            private mailerService: MailerService,
            @InjectModel(User) private userRepository: typeof User,
            ) {}

      async login(authdto: AuthUserDto) {
            const user = await this.validateUser(authdto)
            return this.generateToken(user)
      }

      async register(userDto: CreateUserDto) {
            
            const candidate = await this.userService.getUserByUsername(userDto.username)
            if (candidate) {
                  throw new HttpException("User is already registred", HttpStatus.BAD_REQUEST);        
            }

            const hashPassword = await bcrypt.hash(userDto.password, 5);
            const activationLink = uuidv4();
            console.log(activationLink);
            await this.sendActivationLink(userDto.email, `${process.env.SERVER_URL}/auth/registration/${activationLink}`)

            const user = await this.userService.createUser({...userDto, password: hashPassword}); 
            user.activationLink = activationLink;
            await user.save()
            const userData = await this.userService.getUserByUsername(userDto.username);
            return this.generateToken(userData)
      }

      async generateToken(user: User) {
            const payload = {userName: user.username, id: user.ID, roles: user.roles}            
            return {
                  token: this.jwtService.sign(payload)
            }
      }

      private async validateUser (authdto: AuthUserDto) {
            const user = await this.userService.getUserByEmail(authdto.email)
            const passwordEquals = await bcrypt.compare(authdto.password, user.password)
            if(user && passwordEquals) {
                  return user
            } 
            throw new UnauthorizedException({message: 'password or phone is not corrected!'}); 
      }

      private async sendActivationLink(to: string, link: string) {
            console.log(process.env.SMTP_USER);
            console.log(process.env.SMTP_PASSWORD);

            
            await this.mailerService.sendMail({
                  from: process.env.SMTP_USER,
                  to: to,
                  subject: 'Account activation to ' + process.env.CLIENT_URL,
                  text: '',
                  html: 
                  `
                        <div>
                              <h1>Go to the href to activate your account</h1>
                              <a href="${link}">${link}</a>
                        </div>
                  `
            })
      }

      async activate(activationLink: string) {
            const user = await this.userRepository.findOne({where: {activationLink}, include: {all: true}});
            if(!user) {
                  throw new Error('Activation link is not available');
            }
            user.isActivate = true;
            await user.save();
      }
}
