import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttribute {
  userName: string,
  email: string,
  password: string
}


@Table({tableName: "users"})
export class User extends Model <User, UserCreationAttribute> {

      @ApiProperty({example: 1, description: 'Uniq Id'})
      @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
      ID: number;

      @ApiProperty({example: 1, description: 'Uniq userName'})
      @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true})
      userName: string;

      @ApiProperty({example: 'psychoduckos@gmail.com', description: 'Uniq user email'})
      @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true})
      email: string;

      @ApiProperty({example: 'qweasdzxc123', description: 'user password'})
      @Column({type: DataType.STRING, allowNull: false})
      password: string;

      @BelongsToMany(() => Role, () => UserRoles)
      roles: Role[]
  
}

