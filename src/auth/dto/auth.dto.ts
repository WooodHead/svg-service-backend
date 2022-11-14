import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {

  @ApiProperty({example: 'psychoduck@gmail.com', description: 'user email'})
  readonly email: string;

  @ApiProperty({example: 'qweasdzxc123', description: 'user password'})
  readonly password: string;
}