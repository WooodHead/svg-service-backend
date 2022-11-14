import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddRoleDto } from './dto/add.role.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
      constructor(private userService: UsersService) {}

      @Post('/createUser')
      createUser(@Body() userDto: CreateUserDto) {
            return this.userService.createUser(userDto)
      }

      @Get('/getAllUsers')
      getAllUsers() {
            return this.userService.getAllUsers()
      }

      @Get('/getUserByUsername') 
      getUserByUsername(@Body() userName: string) {
            return this.userService.getUserByUsername(userName)
      }

      @Get('/getUserByID')
      getUserByID(@Body() ID: number) {
            return this.userService.getUserByID(ID)
      }

      @Post('/addRole')
      addRole(@Body() dto: AddRoleDto) {
            return this.userService.addRole(dto)
      }

}
