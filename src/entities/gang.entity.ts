import { BaseEntity } from 'src/common';

import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User, GangMember, GangActivity } from '.';

@Entity()
export class Gang extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  avatarKey: string;

  @OneToOne(() => User, (u) => u.gang)
  owner: User;

  @OneToMany(() => GangMember, (gangMember) => gangMember.gang, {
    nullable: true,
  })
  members: GangMember[];

  @OneToMany(() => GangActivity, (gA) => gA.gang, { nullable: true })
  activities: GangActivity;
}
