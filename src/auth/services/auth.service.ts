import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWT } from 'src/core';
import { UserRepository } from 'src/repository';
import { User } from 'src/user';
import { getCookieToken, TokenPayload } from '..';
import { LoginDto, RegisterUserDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterUserDto): Promise<User> {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const checkUsername = await this.userRepository.findOne({
      username: registerDto.username,
      isDeleted: false,
    });

    if (checkUsername)
      throw new HttpException(
        'This username already in use',
        HttpStatus.CONFLICT,
      );

    if (registerDto.email) {
      const userEmail = await this.userRepository.findOneByEmail(
        registerDto.email,
      );
      if (userEmail) {
        throw new HttpException(
          'This email already in use',
          HttpStatus.CONFLICT,
        );
      }
    }
    return this.userRepository.save(registerDto);
  }

  async loginUser(loginDto: LoginDto) {
    const { user, password } = loginDto;
    const userLogin = await this.userRepository.findOneByUser(user);
    if (!userLogin) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, userLogin.password))) {
      throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
    }
    return userLogin;
  }

  public getCookieWithJwtToken(userId: string): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${JWT.EXPIRED_TIME}`;
    return getCookieToken(token, JWT.EXPIRED_TIME);
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public getRefreshTokenLogin(userId: string): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      expiresIn: JWT.REFRESH_TOKEN.EXPIRED_TIME,
      secret: JWT.REFRESH_TOKEN.SECRET,
    });

    return getCookieToken(token, JWT.REFRESH_TOKEN.EXPIRED_TIME);
  }
}
