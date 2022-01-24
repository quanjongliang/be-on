import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Post, Gang, GangMember, GangActivity } from 'src/entities';
import { GangRepository } from './gang';
import { GangActivityRepository } from './gang-activity';
import { GangMemberRepository } from './gang-member';
import { PostRepository } from './post';
import { UserRepository } from './user';

const listEntities = [User, Post, Gang, GangMember, GangActivity];

const listRepository = [
  UserRepository,
  GangRepository,
  PostRepository,
  GangMemberRepository,
  GangActivityRepository,
];

@Module({
  imports: [TypeOrmModule.forFeature([...listEntities, ...listRepository])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
