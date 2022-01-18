import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User, UserBla } from 'src/user/entities/user.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Before...');
    request.bla = 'hi bla ble';
    request.username = request.params.username;

    const now = Date.now();
    return next.handle().pipe(
      map((value: UserBla[]) => {
        console.log(value);
        console.log('value');

        value.forEach((v) => {
          v.lastName = 'last af';
          v.username = 'username af';
          return { ...v, a: 'adasdasd', b: 'asdasdasd' };
        });
        // value.username = 'asdasdas';
        // value.title = 'title sadas das';
        const a = { ...value, b: 'asdasd', c: 'asd231234' };
        console.log(a);
        return a;
      }),
    );
  }
}
