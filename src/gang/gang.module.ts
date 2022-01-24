import { Module } from '@nestjs/common';
import { CreateGangController, HandleGangController } from './controllers';
import { CoreModule } from 'src/core';
import { RepositoryModule } from 'src/repository';
import { GangService } from './services';

@Module({
  imports: [CoreModule, RepositoryModule],
  controllers: [HandleGangController, CreateGangController],
  providers: [GangService],
})
export class GangModule {}
