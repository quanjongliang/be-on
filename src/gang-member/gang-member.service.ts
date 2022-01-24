import { Injectable } from '@nestjs/common';
import { CreateGangMemberDto } from './dto/create-gang-member.dto';
import { UpdateGangMemberDto } from './dto/update-gang-member.dto';

@Injectable()
export class GangMemberService {
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
}
