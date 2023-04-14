import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    {
      useClass: CurrentUserInterceptor,
      provide: APP_INTERCEPTOR,
    },
  ],
})
export class UsersModule {}
