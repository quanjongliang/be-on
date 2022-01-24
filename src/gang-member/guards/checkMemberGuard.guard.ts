import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestInterface } from 'src/auth';
import { GangMemberRepository, UserRepository } from 'src/repository';
import { USER_MESSAGE } from 'src/user';

@Injectable()
export class CheckMemberGang implements CanActivate {
  constructor(
    private gangMemberRepo: GangMemberRepository,
    private userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestInterface>();
    const { user } = request;
    if (user.gang) {
      return false;
    }
    const gangMember = await this.gangMemberRepo.findGangMemberById(user.id);
    if (gangMember) return false;

    return true;
  }
}
