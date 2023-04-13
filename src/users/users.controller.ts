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
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.authService.signup(body.email, body.password);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }
}
