import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let controller: AppController;

  const mockAppService = {
    getArticles: jest.fn(), // Mock the getArticles function
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();
    controller = module.get<AppController>(AppController);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hi World!');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
