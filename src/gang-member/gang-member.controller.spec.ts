import { Test, TestingModule } from '@nestjs/testing';
import { GangMemberController } from './gang-member.controller';
import { GangMemberService } from './gang-member.service';

describe('GangMemberController', () => {
  let controller: GangMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GangMemberController],
      providers: [GangMemberService],
    }).compile();

    controller = module.get<GangMemberController>(GangMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
