import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables from Vercel secrets
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8080); // Use PORT environment variable if set, otherwise, use 8080
}

bootstrap();
