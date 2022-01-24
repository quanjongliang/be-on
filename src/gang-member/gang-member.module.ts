import { Module } from '@nestjs/common';
import { GangMemberService } from './services';
import { GangMemberController } from './controllers/gang-member.controller';
import { CoreModule } from 'src/core';
import { RepositoryModule } from 'src/repository';

@Module({
  imports: [CoreModule, RepositoryModule],
  controllers: [GangMemberController],
  providers: [GangMemberService],
})
export class GangMemberModule {}
