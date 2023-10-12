import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { getConnectionInfo } from '../config/db';

async function bootstrap() {
  dotenv.config();

  const dbStatus = await getConnectionInfo();
  console.log(`Database connection status: ${dbStatus}`);
  console.log(`Database connection NAME: ${process.env.DB_USER}`);

  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow 'localhost:3000'
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
