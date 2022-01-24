import { Injectable } from '@nestjs/common';
import { CreateGangActivityDto } from './dto/create-gang-activity.dto';
import { UpdateGangActivityDto } from './dto/update-gang-activity.dto';

@Injectable()
export class GangActivityService {
  create(createGangActivityDto: CreateGangActivityDto) {
    return 'This action adds a new gangActivity';
  }

  findAll() {
    return `This action returns all gangActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gangActivity`;
  }

  update(id: number, updateGangActivityDto: UpdateGangActivityDto) {
    return `This action updates a #${id} gangActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} gangActivity`;
  }
}
