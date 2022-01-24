import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestInterface } from 'src/auth';

export const CurrentAny = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestInterface>();
    return request.inviteUser;
  },
);
