import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.usersService.create(body);
  }
}
