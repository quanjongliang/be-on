import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { S3Service } from 'src/core';
import { map } from 'rxjs/operators';
import { UserAvatar } from 'src/entities';

@Injectable()
export class AvatarUploadInterceptor implements NestInterceptor {
  constructor(private s3Service: S3Service) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log(request.file);

    const res = await this.s3Service.uploadAWSFile(request.file);
    console.log(res);
    const url = await this.s3Service.getAWSFileUrl(res.Key);
    const avatar: UserAvatar = {
      key: res.Key,
      url,
    };

    request.avatar = avatar;

    return next.handle().pipe(
      map((value) => {
        return { ...value };
      }),
    );
  }
}
