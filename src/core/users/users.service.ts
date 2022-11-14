import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { RolesService } from '../roles/roles.service';
import { UserRoles } from '../roles/user-roles.model';
import { AddRoleDto } from './dto/add.role.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
      constructor(
            @InjectModel(User) private userRepository: typeof User,
            private roleService: RolesService,
            @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
            ) {
      }
    
      async createUser(dto: CreateUserDto) {
            const user = await this.userRepository.create(dto)
            const role = await this.roleService.getRoleByValue('USER');
            if(role && user) {
              await user.$add('role', role.id)
              return user
            }
            throw new HttpException('User or role is not defind', HttpStatus.NOT_FOUND)
      }
    
      async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users
      }
    
      async getUserByUsername(userName: string) {
        const user = await this.userRepository.findOne({where: {userName}, include: {all: true}})
        return user
      }

      async getUserByID(ID: number) {
            const user = await this.userRepository.findOne({where: {ID}, include: {all: true}})
            return user
          }
    
      async addRole(dto: AddRoleDto) {
           const user = await this.userRepository.findByPk(dto.id)
           const role = await this.roleService.getRoleByValue(dto.value)
    
           if(role && user) {
              await user.$add('role', role.id)
              return dto
           }
           throw new HttpException('User or role is not defind', HttpStatus.NOT_FOUND)
      }

}
