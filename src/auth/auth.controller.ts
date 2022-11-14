import { Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
      constructor(private authService: AuthService) {}
      /*
      @Post('/auth/login')
      login() {
            return this.authService.login(userDto)
      }

      @Post('/auth/register')
      register() {
            return this.authService.register(userDto)
      }

      @Post('/auth/recover') 
      recover() {
            return this.authService.recover(userDto)
      }

      @Get('/auth/recover:code')
      getRecoverCode() {
            return this.authService.getRecoverCode(userDto)
      }

      @Patch('/auth/recover')
      updatePassword() {
            return this.authService.updatePassword(userDto)
      }
      */
}
