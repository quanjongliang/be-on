import { Injectable } from '@nestjs/common';
import { MessageString } from 'src/common';
import { Gang, User } from 'src/entities';
import { GangMemberRepository, GangRepository } from 'src/repository';
import { GANG_MESSAGE } from '..';
import { UpdateGangDto, CreateGangDto } from '../dto';

@Injectable()
export class GangService {
  constructor(
    private gangRepository: GangRepository,
    private gangMemberRepo: GangMemberRepository,
  ) {}
  create(user: User, createGang: CreateGangDto): Promise<Gang> {
    return this.gangRepository.save({ owner: user, ...createGang });
  }

  findAll() {
    return `This action returns all gang`;
  }

  async inviteUser(gang: Gang, id: string): Promise<MessageString> {
    const gangMember = await this.gangMemberRepo.save({ user: { id }, gang });
    gang.members.push(gangMember);
    await this.gangRepository.save(gang);

    return { message: GANG_MESSAGE.USER.INVITE_SUCCESS };
  }

  findOne(id: string) {
    return `This action returns a #${id} gang`;
  }

  update(id: string, updateGangDto: UpdateGangDto) {
    return `This action updates a #${id} gang`;
  }

  remove(id: string) {
    return `This action removes a #${id} gang`;
  }
}
