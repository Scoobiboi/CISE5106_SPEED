import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  getArticles,
  updateArticleStatus,
  addArticle,
  rateArticle,
  addUser,
  findUser,
  updateArticleEvidence,
  searchArticlesByTitle,
} from '../config/db';

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

  @Get('/status/articles/:status') // Updated GET route
  async getArticlesStatus(@Param('status') status: string) {
    const articles = await getArticles(status);
    return articles;
  }

  // Body in put request must look like this: { "status": "approved", "reason": "Your moderation reason" }
  @Put('/articles/:id/status') // Updated PUT route
  async updateArticleStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('reason') reason: string,
  ) {
    const result = await updateArticleStatus(id, status, reason);
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
      Moderation_status: 'Awaiting',
      Rating: 0,
      no_Ratings: 0,
      Evidence: '',
      Moderation_reason: '',
    };
    const result = await addArticle(article);
    return result;
  }

  // {  "evidence": "Evidence test put" }
  @Put('/articles/:id/evidence') // New PUT route for submitting evidence
  async submitEvidence(
    @Param('id') id: string,
    @Body('evidence') evidence: string,
  ) {
    const result = await updateArticleEvidence(id, evidence);
    return result;
  }

  //{ "rating": 5 }
  @Put('/articles/:id/rate')
  async rateArticle(@Param('id') id: string, @Body('rating') rating: number) {
    console.log('id', id);
    console.log('rating', rating);
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
      Role: 'user',
    };
    const result = await addUser(user);
    return result;
  }

  @Post('/login') // New POST route for logging in a user
  async loginUser(@Body() body) {
    const { email, password } = body;
    console.log(email, password);
    const user = await findUser(email, password);

    if (user) {
      // User found, return success response with user's ID and status
      return {
        status: 'success',
        message: 'Login successful',
        userId: user._id,
        userStatus: user.Role,
      };
    } else {
      // User not found, return error response
      return { status: 'error', message: 'Invalid email or password' };
    }
  }
}
