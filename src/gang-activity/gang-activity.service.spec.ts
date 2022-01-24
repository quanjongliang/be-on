import { Test, TestingModule } from '@nestjs/testing';
import { GangActivityService } from './gang-activity.service';

describe('GangActivityService', () => {
  let service: GangActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GangActivityService],
    }).compile();

    service = module.get<GangActivityService>(GangActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
