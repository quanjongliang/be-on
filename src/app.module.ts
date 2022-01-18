import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppGateway } from './app.gateway';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
