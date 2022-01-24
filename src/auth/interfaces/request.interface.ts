import { Request } from 'express';
import { Gang, User, UserAvatar } from 'src/entities';

export interface RequestInterface extends RequestWithUser {
  inviteUser: User;
  currentGang: Gang;
}

export interface RequestWithUser extends Request {
  user: User;
}
export interface RequestWithUserAndAvatar extends RequestWithUser {
  avatar: UserAvatar;
}
