import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddRoleDto } from '../users/dto/add.role.dto';
import { CreateRoleDto } from './dto/create-role-dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
      constructor(private roleService: RolesService) {}

      // Postman tests were passed
      @ApiOperation({summary: 'Get users'})
      @ApiResponse({status: 200, type: [AddRoleDto]})
      @Post('/createRole')
      createRole(@Body() dto: CreateRoleDto) {
            return this.roleService.createRole(dto)
      }

      // Postman tests were passed
      @ApiOperation({summary: 'Get users'})
      @ApiResponse({status: 200, type: [AddRoleDto]})
      @Get("/getRole/:value")
      getRoleByValue(@Param("value") value: string) {
            return this.roleService.getRoleByValue(value)
      }
}
