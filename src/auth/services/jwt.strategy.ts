import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JWT } from 'src/core';
import { UserRepository } from 'src/repository';
import { TokenPayload } from '..';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: JWT.SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userRepository.findOne({
      where: { id: payload.userId, isDeleted: false },
      relations: ['gangs'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
