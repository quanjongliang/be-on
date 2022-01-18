import { Request } from 'express';
import { User, UserAvatar } from 'src/user';

export interface RequestWithUser extends Request {
  user: User;
}
export interface RequestWithUserAndAvatar extends RequestWithUser {
  avatar: UserAvatar;
}
