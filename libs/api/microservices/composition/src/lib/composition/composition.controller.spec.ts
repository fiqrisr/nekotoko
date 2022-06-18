import { Test, TestingModule } from '@nestjs/testing';
import { CompositionController } from './composition.controller';

describe('CompositionController', () => {
  let controller: CompositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompositionController],
    }).compile();

    controller = module.get<CompositionController>(CompositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
