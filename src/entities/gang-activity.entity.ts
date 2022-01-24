import { BaseEntity } from 'src/common';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Gang } from './gang.entity';

@Entity()
export class GangActivity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  startAt: Date;

  @Column({ nullable: false })
  endTime: Date;

  @Column({ nullable: true })
  actualDifference: string;

  @Column({ nullable: true })
  actualTimeSpent: string;

  @ManyToOne(() => Gang, (g) => g.activities, { nullable: true })
  gang: Gang;
}
