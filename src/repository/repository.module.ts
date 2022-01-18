import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user';
import { UserRepository } from './user/user.repository';

const listEntities = [User];

const listRepository = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature([...listEntities, ...listRepository])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
