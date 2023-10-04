import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    getArticles(): Promise<any>;
    getArticlesByTitle(): Promise<any>;
    getArticlesByYear(): Promise<any>;
    getArticlesByStatus(): Promise<any>;
    getArticlesByAuthor(): Promise<any>;
}
