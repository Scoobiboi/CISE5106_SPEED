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
    origin: ['https://cise-5106-speed.vercel.app', 'http://localhost:3000'], // Add your front-end URL here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Add the HTTP methods you want to allow
    credentials: true, // Allow cookies and credentials
  });

  // add a process env port
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
