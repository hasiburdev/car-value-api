import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }
}
