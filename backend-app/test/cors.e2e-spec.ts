import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
//edited some stuff 
import * as request from 'supertest';
describe('CORS Configuration (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have CORS enabled for specific origins', () => {
    return request(app.getHttpServer())
      .get('/some-endpoint') // Replace with the actual endpoint you want to test
      .expect(200) // Replace with the expected status code
      .expect('Access-Control-Allow-Origin', 'https://cise-5106-speed.vercel.app'); // Check the expected CORS origin
  });
});
