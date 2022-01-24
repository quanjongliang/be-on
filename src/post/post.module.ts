import { Module } from '@nestjs/common';
import { PostService } from './services';
import { PostController } from './controllers/auth.post.controller';
import { RepositoryModule } from 'src/repository';
import { CoreModule } from 'src/core';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
