import { GangMember, User } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(GangMember)
export class GangMemberRepository extends Repository<GangMember> {
  findGangMemberById(id: string): Promise<GangMember> {
    // return this.createQueryBuilder()
    //   .from(GangMember, 'gM')
    //   .leftJoinAndSelect('gM.user', 'u')
    //   .where('gM.isDelete = false')
    //   .andWhere('gM.valid = true')
    //   .andWhere('u.id =:id', { id })
    //   .andWhere('u.isDelete = false')
    //   .getOne();
    return this.createQueryBuilder('gM')
      .where('gM.isDelete = false')
      .andWhere('gM.userId =:id ', { id })
      .getOne();
    // return this.findOne({
    //   isDeleted: false,
    //   valid: true,
    //   user: { id, isDeleted: false },
    // });
  }

  findGangMemberByUser(user: User): Promise<GangMember> {
    return this.findOne({ user, valid: true });
  }
}
