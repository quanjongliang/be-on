import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestInterface, RequestWithUser } from 'src/auth';
import { GangMemberRepository, UserRepository } from 'src/repository';
import { USER_MESSAGE } from 'src/user';
import { GANG_MESSAGE } from '..';

@Injectable()
export class CheckUserGang implements CanActivate {
  constructor(
    private gangMemberRepo: GangMemberRepository,
    private userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestInterface>();
    const {
      user,
      params: { id: inviteUserId = '' },
    } = request;
    if (user.gang) {
      throw new HttpException(GANG_MESSAGE.USER.OWNER, HttpStatus.BAD_REQUEST);
    }

    const gangMember = await this.gangMemberRepo.findGangMemberById(user.id);
    if (gangMember) throw new BadRequestException(GANG_MESSAGE.USER.EXIST);

    if (inviteUserId) {
      const inviteUser = await this.userRepo.findOneById(inviteUserId);
      if (!inviteUser)
        throw new BadRequestException(USER_MESSAGE.ERROR.NOT_FOUND);

      if (inviteUser.gang)
        throw new BadRequestException(GANG_MESSAGE.USER.OWNER);

      request.inviteUser = inviteUser;
    }

    return true;
  }
}
