import { Module } from '@nestjs/common';
import { GangMemberService } from './gang-member.service';
import { GangMemberController } from './gang-member.controller';

@Module({
  controllers: [GangMemberController],
  providers: [GangMemberService]
})
export class GangMemberModule {}
