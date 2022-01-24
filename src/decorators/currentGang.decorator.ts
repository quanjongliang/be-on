import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestInterface, RequestWithUser } from 'src/auth';

export const CurrentGang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { currentGang } = ctx.switchToHttp().getRequest<RequestInterface>();
    return currentGang;
  },
);
