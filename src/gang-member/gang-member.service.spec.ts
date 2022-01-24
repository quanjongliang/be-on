import { Test, TestingModule } from '@nestjs/testing';
import { GangMemberService } from './gang-member.service';

describe('GangMemberService', () => {
  let service: GangMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GangMemberService],
    }).compile();

    service = module.get<GangMemberService>(GangMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
