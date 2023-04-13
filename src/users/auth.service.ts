import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email already in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return await this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, hash] = user.password.split('.');
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (hashedPassword.toString('hex') !== hash) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
}
