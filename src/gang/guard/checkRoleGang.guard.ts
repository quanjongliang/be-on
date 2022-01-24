import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestInterface, RequestWithUser } from 'src/auth';
import { GangMemberRepository, UserRepository } from 'src/repository';
import { USER_MESSAGE } from 'src/user';
import { GANG_MESSAGE } from '..';

@Injectable()
export class CheckRoleGang implements CanActivate {
  constructor(
    private reflector: Reflector,
    private gangMemberRepo: GangMemberRepository,
    private userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles) return true;
    const request = context.switchToHttp().getRequest<RequestInterface>();
    const { user } = request;
    if (user.gang) {
      request.currentGang = user.gang;
      return true;
    }

    const gangMember = await this.gangMemberRepo.findGangMemberById(user.id);
    if (!roles.includes(gangMember.role)) {
      throw new BadRequestException(USER_MESSAGE.ERROR.ROLE);
    }

    return false;
  }
}
