import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppGateway } from './app.gateway';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth';
import { GangModule } from './gang/gang.module';
import { GangMemberModule } from './gang-member/gang-member.module';
import { GangActivityModule } from './gang-activity/gang-activity.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), PostModule, AuthModule, GangModule, GangMemberModule, GangActivityModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
