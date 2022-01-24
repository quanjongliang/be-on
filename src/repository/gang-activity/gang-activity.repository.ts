import { GangActivity, User } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(GangActivity)
export class GangActivityRepository extends Repository<GangActivity> {}
