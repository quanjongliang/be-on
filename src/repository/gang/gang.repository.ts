import { Gang } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Gang)
export class GangRepository extends Repository<Gang> {}
