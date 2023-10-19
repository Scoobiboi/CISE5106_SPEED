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
    getArticlesByRating(): Promise<any>;
    updateArticleStatus(id: string, status: boolean): Promise<any>;
    addArticle(body: any): Promise<any>;
    submitEvidence(id: string, evidence: string): Promise<any>;
    rateArticle(id: string, rating: number): Promise<any>;
    searchArticles(title: string): Promise<any>;
    addUser(body: any): Promise<any>;
    loginUser(body: any): Promise<{
        status: string;
        message: string;
        userId: any;
        userStatus: any;
    } | {
        status: string;
        message: string;
        userId?: undefined;
        userStatus?: undefined;
    }>;
}
