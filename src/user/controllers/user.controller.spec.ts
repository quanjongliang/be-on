import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { User } from '../entities';
import { UserService } from '../services';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(userController).toBeDefined();
  });

  const users: User[] = [
    {
      id: randomUUID(),
      firstName: 'Quill',
      lastName: 'Liang',
      isDeleted: false,
      password: '123123',
      avatarKey: 'key_avatar',
      avatarUrl: 'url_avatar',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'quill',
    },
  ];

  //   describe('findAll', () => {
  //     it('should return an array of user', async () => {
  //       jest.spyOn(userService, 'findAll').mockImplementation(() => users);

  //       expect(await userController.findAll()).toBe(users);
  //     });
  //   });
});
