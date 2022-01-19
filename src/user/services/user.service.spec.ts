import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserService } from '.';
import { User } from '..';

const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

describe('User service', () => {
  let service: UserService;
  let spyUserRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    spyUserRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  const activeUsers: User[] = [
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
      refreshToken: '',
      email: '',
      isActive: false,
    },
  ];

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list user with is deleted is false', async () => {
      const listUser = await service.findAll();
      expect(listUser.length > 0).toBe(true);
      expect(listUser).toBe(activeUsers);
    });
  });
});
