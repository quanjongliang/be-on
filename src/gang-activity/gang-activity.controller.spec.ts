import { Test, TestingModule } from '@nestjs/testing';
import { GangActivityController } from './gang-activity.controller';
import { GangActivityService } from './gang-activity.service';

describe('GangActivityController', () => {
  let controller: GangActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GangActivityController],
      providers: [GangActivityService],
    }).compile();

    controller = module.get<GangActivityController>(GangActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
