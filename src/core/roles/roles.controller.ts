import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role-dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
      constructor(private roleService: RolesService) {}

      @Post('/createRole')
      createRole(@Body() dto: CreateRoleDto) {
            return this.roleService.createRole(dto)
      }

      @Get("/getRole")
      getRoleByValue(@Param("value") value: string) {
            return this.roleService.getRoleByValue(value)
      }
}
