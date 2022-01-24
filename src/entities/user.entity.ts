import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common';
import { Gang, GangActivity, GangMember, Post } from 'src/entities';

export enum UserStatus {
  ONLINE = 'online',
  AWAY = 'away',
  OFFLINE = 'offline',
}

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  avatarKey: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ enum: UserStatus, default: UserStatus.ONLINE })
  status: UserStatus;

  @Column({ default: '' })
  message: string;

  @OneToOne(() => Gang, (g) => g.owner, { nullable: true })
  @JoinColumn()
  gang: Gang;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne(() => GangMember, (gM) => gM.user, { nullable: true })
  @JoinColumn()
  gangMember: GangMember;
}

export interface UserAvatar {
  url: string;
  key: string;
}

export interface ParamsAws {
  Bucket: string;
  Key: string;
}
