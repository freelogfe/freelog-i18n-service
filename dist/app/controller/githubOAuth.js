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
const midway_1 = require("midway");
let GithubOAuthController = class GithubOAuthController {
    constructor(app) {
        this.app = app;
    }
    async getGithubOAuthAccessToken() {
        const { client_id, client_secret, code } = this.ctx.request.body;
        const response = await this.app.curl(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {
            method: 'post',
            dataType: 'json',
        });
        const oAuthData = response.data;
        if (oAuthData.error) {
            throw new Error(oAuthData.error);
        }
        else {
            this.ctx.success(oAuthData);
        }
    }
    async getGithubUserInfo() {
        const { accessToken } = this.ctx.request.query;
        const response = await this.app.curl('https://api.github.com/user', {
            method: 'get',
            dataType: 'json',
            headers: {
                accept: 'application/json',
                Authorization: `token ${accessToken}`,
            },
        });
        this.ctx.success(response.data);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GithubOAuthController.prototype, "ctx", void 0);
__decorate([
    midway_1.get('/access'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GithubOAuthController.prototype, "getGithubOAuthAccessToken", null);
GithubOAuthController = __decorate([
    midway_1.provide(),
    midway_1.controller('/github/oAuth'),
    __metadata("design:paramtypes", [midway_1.Application])
], GithubOAuthController);
exports.GithubOAuthController = GithubOAuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvZ2l0aHViT0F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBK0U7QUFJL0UsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFHaEMsWUFBWSxHQUFnQjtRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBTUQsS0FBSyxDQUFDLHlCQUF5QjtRQUM3QixNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5REFBeUQsU0FBUyxrQkFBa0IsYUFBYSxTQUFTLElBQUksRUFBRSxFQUFFO1lBQ3JKLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLE1BQU07U0FDakIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTtRQUMvQixJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQzVCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUM5QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ2xFLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLGFBQWEsRUFBRSxTQUFTLFdBQVcsRUFBRTthQUN0QztTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0YsQ0FBQTtBQTdCQztJQURDLGVBQU0sRUFBRTs7a0RBQ0c7QUFHWjtJQURDLFlBQUcsQ0FBQyxTQUFTLENBQUM7Ozs7c0VBYWQ7QUF2QlUscUJBQXFCO0lBRmpDLGdCQUFPLEVBQUU7SUFDVCxtQkFBVSxDQUFDLGVBQWUsQ0FBQztxQ0FJVCxvQkFBVztHQUhqQixxQkFBcUIsQ0FxQ2pDO0FBckNZLHNEQUFxQiJ9