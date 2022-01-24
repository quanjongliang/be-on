import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Post, Gang, GangMember } from 'src/entities';
import { GangMemberRepository, GangRepository } from '.';
import { PostRepository } from './post';
import { UserRepository } from './user';

const listEntities = [User, Post, Gang, GangMember];

const listRepository = [
  UserRepository,
  GangRepository,
  PostRepository,
  GangMemberRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature([...listEntities, ...listRepository])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
