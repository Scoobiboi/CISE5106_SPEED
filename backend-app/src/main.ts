import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { connectClient } from './config/db'; // Changed this line

async function bootstrap() {
  dotenv.config();

  const dbStatus = await connectClient();
  console.log(`Database connection status: ${dbStatus}`);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
