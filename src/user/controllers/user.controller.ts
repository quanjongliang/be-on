import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserAvatar, UserBla } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentAny, CurrentImage, CurrentUser } from 'src/decorators';
import { AvatarUploadInterceptor } from '../interceptors';
import { multerConfig } from 'src/core';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser, RequestWithUserAndAvatar } from 'src/auth';
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', multerConfig),
    AvatarUploadInterceptor,
  )
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
    @CurrentImage() image: UserAvatar,
  ): Promise<User> {
    console.log(file);
    console.log(user);
    console.log(image);
    return this.userService.updateAvatarForUser(user, image);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('deteled')
  findAllDeleted(): Promise<User[]> {
    return this.userService.findAllUserDeleted();
  }

  @Get('/id=:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('/username=:username')
  findByUsername(
    @Param('username') username: string,
    @CurrentAny() any: any,
  ): Promise<UserBla> {
    console.log(any);
    return this.userService.findByUsername(username);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.remove(id);
  }
}
