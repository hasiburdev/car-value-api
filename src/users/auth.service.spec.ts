import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      findByEmail: (email: string) => {
        const filteredUser = users.find((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      find: () => Promise.resolve(null),
      create: (email: string, password: string) => {
        const user = {
          email,
          password,
          id: Math.floor(Math.random() * 1000).toString(),
        };
        users.push(user);
        return Promise.resolve({ email, password, id: 'ldkfjs' } as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Can create a new user with hashed password', async () => {
    const user = await service.signup('a@test.com', '123456');

    expect(user.password).not.toEqual('123456');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // fakeUsersService.findByEmail = (email: string) =>
    //   Promise.resolve({ email, id: '123' } as User);
    await service.signup('a@a.com', '123456');

    expect(service.signup('a@a.com', '123456')).rejects.toThrow();
  });

  it('throws if signin is called with an unused email', async () => {
    expect(service.signin('a@a.com', '123456')).rejects.toThrow();
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.findByEmail = (email: string) =>
      Promise.resolve({
        id: '123',
        email,
        password: '123456',
      } as User);
    expect(service.signin('a@a.com', '123456')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('test@test.com', '123456');
    const user = await service.signin('test@test.com', '123456');
    expect(user).toBeDefined();
  });
});
