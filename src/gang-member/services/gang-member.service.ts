import { Injectable } from '@nestjs/common';
import { GangMember, User } from 'src/entities';
import { GangMemberRepository } from 'src/repository';
import { CreateGangMemberDto, UpdateGangMemberDto } from '../dto';

@Injectable()
export class GangMemberService {
  constructor(private gangMemberRepo: GangMemberRepository) {}

  create(createGangMemberDto: CreateGangMemberDto) {
    return 'This action adds a new gangMember';
  }

  findAll() {
    return `This action returns all gangMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gangMember`;
  }

  update(id: number, updateGangMemberDto: UpdateGangMemberDto) {
    return `This action updates a #${id} gangMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} gangMember`;
  }

  async getAllInvite(user: User): Promise<GangMember[]> {
    return this.gangMemberRepo.find({ isDeleted: false, user });
  }
}
