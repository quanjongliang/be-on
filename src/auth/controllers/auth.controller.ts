import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUser } from '../interfaces';
import { RegisterUserDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { User } from 'src/user';
import { CurrentUser } from 'src/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  // authenticate(@Req() request: RequestWithUser): User {
  //   return request.user;
  // }
  authenticate(@CurrentUser() user: User): User {
    return user;
  }

  @Post('register')
  async registerUser(@Body() registerDto: RegisterUserDto): Promise<User> {
    return this.authService.registerUser(registerDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return cookie;
  }
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
