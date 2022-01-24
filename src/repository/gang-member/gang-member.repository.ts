import { GangMember } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(GangMember)
export class GangMemberRepository extends Repository<GangMember> {
  findGangMemberById(id: string): Promise<GangMember> {
    return this.findOne({
      isDeleted: false,
      valid: true,
      user: { id, isDeleted: false },
    });
  }
}
