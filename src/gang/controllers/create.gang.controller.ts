import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { multerConfig } from 'src/core';
import { CurrentGang, CurrentUser, Roles } from 'src/decorators';
import { Gang, MemberRoles, User } from 'src/entities';
import { CreateGangDto } from '..';
import { CheckRoleGang, CheckUserGang } from '../guard';
import { GangService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('gang')
export class CreateGangController {
  constructor(private gangService: GangService) {}

  @Post('create')
  @UseGuards(CheckUserGang)
  async createNewGang(
    @CurrentUser() user: User,
    @Body() createGang: CreateGangDto,
  ): Promise<Gang> {
    return this.gangService.create(user, createGang);
  }

  @Post('add/:id')
  @Roles(MemberRoles.ADMIN, MemberRoles.CENSORSHIP)
  @UseGuards(CheckRoleGang)
  async inviteUserToGang(
    @CurrentGang() gang: Gang,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.gangService.inviteUser(gang, id);
  }
}
