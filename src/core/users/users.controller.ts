import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add.role.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
      constructor(private userService: UsersService) {}

      //Postman tests were passed
      @ApiOperation({summary: 'Create user'})
      @ApiResponse({status: 200, type: [User]})
      @Post('/createUser')
      createUser(@Body() userDto: CreateUserDto) {
           return this.userService.createUser(userDto)
      }

      //Postman tests were passed
      @ApiOperation({summary: 'Get all users'})
      @ApiResponse({status: 200, type: [User]})
      @Get('/getAllUsers')
      getAllUsers() {
           return this.userService.getAllUsers()
      }

      // Postman tests were passed
      @ApiOperation({summary: 'Get user by username'})
      @ApiResponse({status: 200, type: [User]})
      @Get('/getUserByUsername/:userName') 
      getUserByUsername(@Param("userName") userName: string) {
            return this.userService.getUserByUsername(userName)
      }

      // Postman tests were passed
      @ApiOperation({summary: 'Get user by ID'})
      @ApiResponse({status: 200, type: [User]})
      @Get('/getUserByID/:ID')
      getUserByID(@Param("ID") ID: number) {
            return this.userService.getUserByID(ID)
      }

      // Postman tests were passed
      @ApiOperation({summary: 'Add role for user'})
      @ApiResponse({status: 200, type: [AddRoleDto]})
      @Post('/addRole')
      addRole(@Body() dto: AddRoleDto) {
            return this.userService.addRole(dto)
      }

}
