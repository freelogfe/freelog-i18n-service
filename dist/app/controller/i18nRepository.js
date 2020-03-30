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
let I18nDataController = class I18nDataController {
    async getAllI18nFileData() {
        const result = await this.irSerive.getAllI18nData();
        this.ctx.success(result);
    }
    async getI18nFileDataByPath() {
        const result = await this.irSerive.getI18nDataByPath();
        this.ctx.success(result);
    }
    async updateI18nFileData() {
    }
    async creaetNewModule() {
    }
    async deleteModule() {
    }
    async downloadFile() {
    }
    async checkRepository() {
    }
    async getRepositoryInfo() {
    }
    async updateKeyInfo() {
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], I18nDataController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject('i18nRepositorySerive'),
    __metadata("design:type", Object)
], I18nDataController.prototype, "irSerive", void 0);
__decorate([
    midway_1.get('/allData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "getAllI18nFileData", null);
__decorate([
    midway_1.get('/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "getI18nFileDataByPath", null);
__decorate([
    midway_1.put('/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "updateI18nFileData", null);
__decorate([
    midway_1.post('/module/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "creaetNewModule", null);
__decorate([
    midway_1.del('/module/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "deleteModule", null);
__decorate([
    midway_1.get('/data/download'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "downloadFile", null);
__decorate([
    midway_1.get('/keysInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "getRepositoryInfo", null);
__decorate([
    midway_1.put('/keyInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "updateKeyInfo", null);
I18nDataController = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/i18nRepository')
], I18nDataController);
exports.I18nDataController = I18nDataController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4blJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvaTE4blJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBa0Y7QUFLbEYsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFTN0IsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdELEtBQUssQ0FBQyxxQkFBcUI7UUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdELEtBQUssQ0FBQyxrQkFBa0I7SUFFeEIsQ0FBQztJQUdELEtBQUssQ0FBQyxlQUFlO0lBRXJCLENBQUM7SUFHRCxLQUFLLENBQUMsWUFBWTtJQUNsQixDQUFDO0lBR0QsS0FBSyxDQUFDLFlBQVk7SUFDbEIsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlO0lBQ3JCLENBQUM7SUFHRCxLQUFLLENBQUMsaUJBQWlCO0lBQ3ZCLENBQUM7SUFHRCxLQUFLLENBQUMsYUFBYTtJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQTdDQztJQURDLGVBQU0sRUFBRTs7K0NBQ0c7QUFHWjtJQURDLGVBQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7b0RBQ0E7QUFHL0I7SUFEQyxZQUFHLENBQUMsVUFBVSxDQUFDOzs7OzREQUlmO0FBR0Q7SUFEQyxZQUFHLENBQUMsT0FBTyxDQUFDOzs7OytEQUlaO0FBR0Q7SUFEQyxZQUFHLENBQUMsT0FBTyxDQUFDOzs7OzREQUdaO0FBR0Q7SUFEQyxhQUFJLENBQUMsZ0JBQWdCLENBQUM7Ozs7eURBR3RCO0FBR0Q7SUFEQyxZQUFHLENBQUMsZ0JBQWdCLENBQUM7Ozs7c0RBRXJCO0FBR0Q7SUFEQyxZQUFHLENBQUMsZ0JBQWdCLENBQUM7Ozs7c0RBRXJCO0FBTUQ7SUFEQyxZQUFHLENBQUMsV0FBVyxDQUFDOzs7OzJEQUVoQjtBQUdEO0lBREMsWUFBRyxDQUFDLFVBQVUsQ0FBQzs7Ozt1REFFZjtBQS9DVSxrQkFBa0I7SUFGOUIsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsb0JBQW9CLENBQUM7R0FDcEIsa0JBQWtCLENBZ0Q5QjtBQWhEWSxnREFBa0IifQ==