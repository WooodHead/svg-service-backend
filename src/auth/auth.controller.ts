import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/core/users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
      constructor(private authService: AuthService) {}

      @Post('/login')
      login(@Body() dto: AuthUserDto) {
            return this.authService.login(dto)
      }

      @Post('/register') 
      register(@Body() dto: CreateUserDto) {
            return this.authService.register(dto)
      }
/*
      // Recover - изменить пароль, восстановить учетную запись
      @Post('/recover') 
      recover() {
            return this.authService.recover(userDto)
      }

      // Получить код восстановления на почту
      @Get('/recover:code')
      getRecoverCode() {
            return this.authService.getRecoverCode(userDto)
      }

      // Изменить пароль в бд
      @Patch('/recover')
      updatePassword() {
            return this.authService.updatePassword(userDto)
      }
*/
}
