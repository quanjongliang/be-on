import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentAny = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.username;
  },
);
