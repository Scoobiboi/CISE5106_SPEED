//Previous code is commented out. 
import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  getArticles,
  updateArticleStatus,
  addArticle,
  rateArticle,
} from '../config/db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<string> {
    try {
      const result = await this.appService.getHello();
      return result;
    } catch (error) {
      // Handle the error and send an appropriate response
      throw new Error('Failed to get hello');
    }
  }

  @Get('/articles')
  async getArticles() {
    try {
      const articles = await getArticles();
      return articles;
    } catch (error) {
      // Handle the error and send an appropriate response
      throw new Error('Failed to get articles');
    }
  }

  // Other controller methods...

  @Put('/articles/:id/status')
  async updateArticleStatus(@Param('id') id: string, @Body('status') status: boolean) {
    try {
      const result = await updateArticleStatus(id, status);
      return result;
    } catch (error) {
      // Handle the error and send an appropriate response
      throw new Error('Failed to update article status');
    }
  }

  @Post('/articles')
  async addArticle(@Body() body) {
    try {
      const article = {
        title: body.title,
        Authors: body.Authors,
        Journal_Name: body.Journal_Name,
        Publication_year: body.Publication_year,
        Moderation_status: false,
        Rating: 0,
        no_Ratings: 0,
      };
      const result = await addArticle(article);
      return result;
    } catch (error) {
      // Handle the error and send an appropriate response
      throw new Error('Failed to add an article');
    }
  }

  @Put('/articles/:id/rate')
  async rateArticle(@Param('id') id: string, @Body('rating') rating: number) {
    try {
      const result = await rateArticle(id, rating);
      return result;
    } catch (error) {
      // Handle the error and send an appropriate response
      throw new Error('Failed to rate the article');
    }
  }
}

//import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
// import { AppService } from './app.service';
// import { getArticles, updateArticleStatus, addArticle, rateArticle } from '../config/db';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get('/')
//   getHello(): Promise<string> {
//     return this.appService.getHello();
//   }

//   @Get('/articles')
//   async getArticles() {
//     const articles = await getArticles();
//     return articles;
//   }

//   @Get('/title/articles')
//   async getArticlesByTitle() {
//     const articles = await getArticles('title');
//     return articles;
//   }

//   @Get('/year/articles')
//   async getArticlesByYear() {
//     const articles = await getArticles('Publication_year');
//     return articles;
//   }

//   @Get('/status/articles')
//   async getArticlesByStatus() {
//     const articles = await getArticles('Moderation_status');
//     return articles;
//   }

//   @Get('/authors/articles')
//   async getArticlesByAuthor() {
//     const articles = await getArticles('Authors');
//     return articles;
//   }

//   @Get('/rating/articles')
//   async getArticlesByRating() {
//     const articles = await getArticles('Rating');
//     return articles;
//   }

//   // Body in put request must look like this: { "status": false }
//   @Put('/articles/:id/status') // New PUT route
//   async updateArticleStatus(@Param('id') id: string, @Body('status') status: boolean) {
//     const result = await updateArticleStatus(id, status);
//     return result;
//   }

//   // {
//   //  "title": "Arin POST test 2",
//   //  "Authors": "Arin Bindra",
//   //  "Journal_Name": "Arin Posted Articles",
//   //  "Publication_year": 2022 
//   //  }
//   @Post('/articles') // New POST route
//   async addArticle(@Body() body) {
//     const article = {
//       title: body.title,
//       Authors: body.Authors,
//       Journal_Name: body.Journal_Name,
//       Publication_year: body.Publication_year,
//       Moderation_status: false,
//       Rating: 0,
//       no_Ratings: 0
//     };
//     const result = await addArticle(article);
//     return result;
//   }

//   //{ "rating": 5 }
//   @Put('/articles/:id/rate') // New PUT route for rating
//   async rateArticle(@Param('id') id: string, @Body('rating') rating: number) {
//     const result = await rateArticle(id, rating);
//     return result;
//   }
// }
