import { Module } from '@nestjs/common';
import { S3Service } from './services';

const providers = [S3Service];

@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule {}
