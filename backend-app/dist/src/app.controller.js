"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const db_1 = require("../config/db");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getArticles() {
        const articles = await (0, db_1.getArticles)();
        return articles;
    }
    async getArticlesByTitle() {
        const articles = await (0, db_1.getArticles)('title');
        return articles;
    }
    async getArticlesByYear() {
        const articles = await (0, db_1.getArticles)('Publication_year');
        return articles;
    }
    async getArticlesByStatus() {
        const articles = await (0, db_1.getArticles)('Moderation_status');
        return articles;
    }
    async getArticlesByAuthor() {
        const articles = await (0, db_1.getArticles)('Authors');
        return articles;
    }
    async getArticlesByRating() {
        const articles = await (0, db_1.getArticles)('Rating');
        return articles;
    }
    async getArticlesStatus(status) {
        const articles = await (0, db_1.getArticles)(status);
        return articles;
    }
    async updateArticleStatus(id, status, reason) {
        const result = await (0, db_1.updateArticleStatus)(id, status, reason);
        return result;
    }
    async addArticle(body) {
        const article = {
            title: body.title,
            Authors: body.Authors,
            Journal_Name: body.Journal_Name,
            Publication_year: body.Publication_year,
            Moderation_status: 'Awaiting Approval',
            Rating: 0,
            no_Ratings: 0,
            Evidence: '',
            Moderation_reason: '',
        };
        const result = await (0, db_1.addArticle)(article);
        return result;
    }
    async submitEvidence(id, evidence) {
        const result = await (0, db_1.updateArticleEvidence)(id, evidence);
        return result;
    }
    async rateArticle(id, rating) {
        console.log('id', id);
        console.log('rating', rating);
        const result = await (0, db_1.rateArticle)(id, rating);
        return result;
    }
    async searchArticles(title) {
        const articles = await (0, db_1.searchArticlesByTitle)(title);
        return articles;
    }
    async addUser(body) {
        const user = {
            Name: body.Name,
            Password: body.Password,
            Email: body.Email,
            Role: 'user',
        };
        const result = await (0, db_1.addUser)(user);
        return result;
    }
    async loginUser(body) {
        const { email, password } = body;
        console.log(email, password);
        const user = await (0, db_1.findUser)(email, password);
        if (user) {
            return {
                status: 'success',
                message: 'Login successful',
                userId: user._id,
                userStatus: user.Role,
            };
        }
        else {
            return { status: 'error', message: 'Invalid email or password' };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Get)('/title/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesByTitle", null);
__decorate([
    (0, common_1.Get)('/year/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesByYear", null);
__decorate([
    (0, common_1.Get)('/status/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesByStatus", null);
__decorate([
    (0, common_1.Get)('/authors/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesByAuthor", null);
__decorate([
    (0, common_1.Get)('/rating/articles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesByRating", null);
__decorate([
    (0, common_1.Get)('/status/articles/:status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticlesStatus", null);
__decorate([
    (0, common_1.Put)('/articles/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateArticleStatus", null);
__decorate([
    (0, common_1.Post)('/articles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addArticle", null);
__decorate([
    (0, common_1.Put)('/articles/:id/evidence'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('evidence')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "submitEvidence", null);
__decorate([
    (0, common_1.Put)('/articles/:id/rate'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "rateArticle", null);
__decorate([
    (0, common_1.Get)('/articles/search/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "searchArticles", null);
__decorate([
    (0, common_1.Post)('/users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginUser", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map