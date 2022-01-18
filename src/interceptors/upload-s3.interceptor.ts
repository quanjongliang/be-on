import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { S3Service } from 'src/core';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class S3UploadInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log(request);

    return next.handle().pipe(
      map((value) => {
        console.log(value);
        console.log('value');
        const a = { ...value, b: 'asdasd', c: 'asd231234' };
        console.log(a);
        return a;
      }),
    );
  }
}
