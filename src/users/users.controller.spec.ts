import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signin: () => {
        return Promise.resolve({
          id: '123',
          email: 'a@a.com',
          password: '123',
        } as User);
      },
      // signup: () => {},
    };
    fakeUserService = {
      findByEmail: (email: string) => {
        return Promise.resolve({ id: '123', email, password: '123' } as User);
      },
      findOne: (id) => {
        return Promise.resolve({ id, email: '123', password: '123' } as User);
      },
      create: (email, password) => {
        return Promise.resolve({ id: '123', email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUserService },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update session object and return user', async () => {
    const session = { userId: '' };
    const user = await controller.signin(
      { email: 'a@a.com', password: '123' },
      session,
    );
    expect(user).toBeDefined();
    expect(session?.userId).toEqual(user.id);
  });
});
