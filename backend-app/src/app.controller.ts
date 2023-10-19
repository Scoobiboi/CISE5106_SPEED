import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { getArticles, updateArticleStatus, addArticle, rateArticle, addUser, findUser, updateArticleEvidence, searchArticlesByTitle } from '../config/db';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): Promise<string> {
    return this.appService.getHello();
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

  @Get('/title/articles')
  async getArticlesByTitle() {
    const articles = await getArticles('title');
    return articles;
  }

  @Get('/year/articles')
  async getArticlesByYear() {
    const articles = await getArticles('Publication_year');
    return articles;
  }

  @Get('/status/articles')
  async getArticlesByStatus() {
    const articles = await getArticles('Moderation_status');
    return articles;
  }

  @Get('/authors/articles')
  async getArticlesByAuthor() {
    const articles = await getArticles('Authors');
    return articles;
  }

  @Get('/rating/articles')
  async getArticlesByRating() {
    const articles = await getArticles('Rating');
    return articles;
  }

  // Body in put request must look like this: { "status": false }
  @Put('/articles/:id/status') // New PUT route
  async updateArticleStatus(@Param('id') id: string, @Body('status') status: boolean) {
    const result = await updateArticleStatus(id, status);
    return result;
  }

  // {
  //  "title": "Arin POST test 2",
  //  "Authors": "Arin Bindra",
  //  "Journal_Name": "Arin Posted Articles",
  //  "Publication_year": 2022 
  //  }
  @Post('/articles') // New POST route
  async addArticle(@Body() body) {
    const article = {
      title: body.title,
      Authors: body.Authors,
      Journal_Name: body.Journal_Name,
      Publication_year: body.Publication_year,
      Moderation_status: false,
      Rating: 0,
      no_Ratings: 0,
      Evidence: ""
    };
    const result = await addArticle(article);
    return result;
  }

  @Put('/articles/:id/evidence') // New PUT route for submitting evidence
  async submitEvidence(@Param('id') id: string, @Body('evidence') evidence: string) {
    const result = await updateArticleEvidence(id, evidence);
    return result;
  }

  //{ "rating": 5 }
  @Put('/articles/:id/rate') // New PUT route for rating
  async rateArticle(@Param('id') id: string, @Body('rating') rating: number) {
    const result = await rateArticle(id, rating);
    return result;
  }

  @Get('/articles/search/:title') // New GET route for searching articles by title
  async searchArticles(@Param('title') title: string) {
    const articles = await searchArticlesByTitle(title);
    return articles;
  }

  //{
  //  "Name": "John Doe",
  //  "Password": "password123",
  //  "Email": "johndoe@example.com"
  //  }
  @Post('/users') // New POST route for creating a user
  async addUser(@Body() body) {
    const user = {
      Name: body.Name,
      Password: body.Password,
      Email: body.Email,
      Role: "user",
    };
    const result = await addUser(user);
    return result;
  }

  @Post('/login') // New POST route for logging in a user
  async loginUser(@Body() body) {
    const { Email, Password } = body;
    const user = await findUser(Email, Password);
    
    if (user) {
      // User found, return success response with user's ID and status
      return { 
        status: 'success', 
        message: 'Login successful', 
        userId: user._id, 
        userStatus: user.Role 
      };
    } else {
      // User not found, return error response
      return { status: 'error', message: 'Invalid email or password' };
    }
  }
}
