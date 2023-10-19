import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';

describe('AppController', () => {
    let controller: AppController;
    const mockAppService= {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
    .overrideProvider(AppService)
    .useValue(mockAppService)
    .compile();
    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () =>{
    expect(controller).toBeDefined();
  })
});

