import { Module } from '@nestjs/common';
import { GangService } from './services';
import { CreateGangController, HandleGangController } from './controllers';
import { CoreModule } from 'src/core';
import { RepositoryModule } from 'src/repository';

@Module({
  imports: [CoreModule, RepositoryModule],
  controllers: [HandleGangController, CreateGangController],
  providers: [GangService],
})
export class GangModule {}
