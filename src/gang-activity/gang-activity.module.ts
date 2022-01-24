import { Module } from '@nestjs/common';
import { GangActivityService } from './gang-activity.service';
import { GangActivityController } from './gang-activity.controller';

@Module({
  controllers: [GangActivityController],
  providers: [GangActivityService]
})
export class GangActivityModule {}
