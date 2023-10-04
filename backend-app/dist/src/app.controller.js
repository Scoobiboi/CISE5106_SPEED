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
        const articles = await (0, db_1.getArticles)('year');
        return articles;
    }
    async getArticlesByStatus() {
        const articles = await (0, db_1.getArticles)('status');
        return articles;
    }
    async getArticlesByAuthor() {
        const articles = await (0, db_1.getArticles)('authors');
        return articles;
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
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map