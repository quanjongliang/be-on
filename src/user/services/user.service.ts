import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/core';
import { UserRepository } from 'src/repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserAvatar } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private s3Service: S3Service,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      username: createUserDto.username,
      isDeleted: false,
    });
    if (user) {
      throw new ConflictException('user name exist');
    }
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ isDeleted: false });
  }

  findAllUserDeleted(): Promise<User[]> {
    return this.userRepository.find({ isDeleted: true });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id, isDeleted: false });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      username,
      isDeleted: false,
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.update(user, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<string> {
    const user = await this.findOne(id);
    await this.userRepository.update(user, { isDeleted: true });
    return 'Deleted user';
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateAvatarForUser(user: User, avatar: UserAvatar): Promise<User> {
    if (user.avatarKey) {
      await this.s3Service.deleteAwsFile(user.avatarKey);
    }
    user.avatarKey = avatar.key;
    user.avatarUrl = avatar.url;

    return this.userRepository.save(user);
  }
}
