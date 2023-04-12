import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.usersService.create(body);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
