import { BaseEntity } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Gang } from './gang.entity';
import { User } from './user.entity';

export enum MemberRoles {
  MEMBER = 'member',
  CENSORSHIP = 'censorship',
  ADMIN = 'admin',
}

@Entity()
export class GangMember extends BaseEntity {
  @ManyToOne(() => Gang, (gang) => gang.members)
  gang: Gang;

  @ManyToOne(() => User, (u) => u.gangMember, { nullable: true, cascade: true })
  user: User;

  @Column({ default: false })
  valid: boolean;

  @Column({ default: MemberRoles.MEMBER, enum: MemberRoles })
  role: MemberRoles;
}
