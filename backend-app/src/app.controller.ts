import { Controller, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
