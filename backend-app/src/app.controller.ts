import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getArticles } from '../config/db'; // Changed this line

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/articles')
  async getArticles() {
    const articles = await getArticles();
    return articles;
  }

  @Get('/title/articles')
  async getArticlesByTitle() {
    const articles = await getArticles('title');
    return articles;
  }

  @Get('/year/articles')
  async getArticlesByYear() {
    const articles = await getArticles('year');
    return articles;
  }


  @Get('/status/articles')
  async getArticlesByStatus() {
    const articles = await getArticles('status');
    return articles;
  }

  @Get('/authors/articles')
  async getArticlesByAuthor() {
    const articles = await getArticles('authors');
    return articles;
  }

  
}
