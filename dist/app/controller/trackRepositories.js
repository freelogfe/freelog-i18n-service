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
let TrackRepositoriesController = class TrackRepositoriesController {
    async getTrackedRepositories() {
        const result = await this.trService.scanAllRepositories();
        this.ctx.success(result);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], TrackRepositoriesController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject('repositoryInfoService'),
    __metadata("design:type", Object)
], TrackRepositoriesController.prototype, "riService", void 0);
__decorate([
    midway_1.inject('trackRepositoriesService'),
    __metadata("design:type", Object)
], TrackRepositoriesController.prototype, "trService", void 0);
__decorate([
    midway_1.get('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrackRepositoriesController.prototype, "getTrackedRepositories", null);
TrackRepositoriesController = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/trackedRepositories')
], TrackRepositoriesController);
exports.TrackRepositoriesController = TrackRepositoriesController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSZXBvc2l0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvdHJhY2tSZXBvc2l0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBa0U7QUFNbEUsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFZdEMsS0FBSyxDQUFDLHNCQUFzQjtRQUMxQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQWJDO0lBREMsZUFBTSxFQUFFOzt3REFDRztBQUdaO0lBREMsZUFBTSxDQUFDLHVCQUF1QixDQUFDOzs4REFDQztBQUdqQztJQURDLGVBQU0sQ0FBQywwQkFBMEIsQ0FBQzs7OERBQ0c7QUFHdEM7SUFEQyxZQUFHLENBQUMsT0FBTyxDQUFDOzs7O3lFQUlaO0FBZlUsMkJBQTJCO0lBRnZDLGdCQUFPLEVBQUU7SUFDVCxtQkFBVSxDQUFDLHlCQUF5QixDQUFDO0dBQ3pCLDJCQUEyQixDQWdCdkM7QUFoQlksa0VBQTJCIn0=