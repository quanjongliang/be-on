import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core';
import { UserController } from './controllers';
import { UserService } from './services';
import { AvatarUploadInterceptor } from './interceptors';
import { RepositoryModule } from 'src/repository';

@Module({
  imports: [CoreModule, RepositoryModule],
  providers: [UserService, AvatarUploadInterceptor],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
