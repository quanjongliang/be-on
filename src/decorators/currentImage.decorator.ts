import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUserAndAvatar } from 'src/auth';

export const CurrentImage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { avatar } = ctx
      .switchToHttp()
      .getRequest<RequestWithUserAndAvatar>();
    return avatar;
  },
);
