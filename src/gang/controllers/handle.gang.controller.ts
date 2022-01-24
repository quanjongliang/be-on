import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { multerConfig } from 'src/core';
import { GangService } from '..';

@UseGuards(JwtAuthGuard)
@Controller('gang-handle')
export class HandleGangController {
  constructor(private gangService: GangService) {}

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadAvatarGang(@UploadedFile() file: Express.Multer.File) {}
}
