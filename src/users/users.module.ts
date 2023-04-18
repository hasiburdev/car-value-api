import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
