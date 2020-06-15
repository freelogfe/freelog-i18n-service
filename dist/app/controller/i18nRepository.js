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
        const result = await this.irSerive.updateI18nData();
        this.ctx.success(result);
    }
    async creaetNewModule() {
        const result = await this.irSerive.creaetNewModule();
        this.ctx.success(result);
    }
    async deleteModule() {
        const result = await this.irSerive.deleteModule();
        this.ctx.success(result);
    }
    async downloadFile() {
        const result = await this.irSerive.downloadI18nFile();
        this.ctx.success(result);
    }
    async checkRepository() {
        const result = await this.irSerive.checkRepository();
        this.ctx.success(result);
    }
    async getRepositoryKeysInfo() {
        const { repositoryName } = this.ctx.query;
        const result = await this.kInfoService.readKeysInfoFile(repositoryName);
        this.ctx.success(result);
    }
    async updateRepositoryKeyInfo() {
        const { repositoryName, moduleName, key, keyInfo } = this.ctx.request.body;
        await this.kInfoService.updateKeyInfo(repositoryName, moduleName, key, keyInfo);
        this.ctx.success(null);
    }
    async commitAndPushChanges() {
        const result = await this.irSerive.commitAndPushChanges();
        this.ctx.success(result);
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
    midway_1.inject('keysInfoService'),
    __metadata("design:type", Object)
], I18nDataController.prototype, "kInfoService", void 0);
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
    midway_1.post('/newModule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "creaetNewModule", null);
__decorate([
    midway_1.del('/module'),
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
    midway_1.get('/check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "checkRepository", null);
__decorate([
    midway_1.get('/keysInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "getRepositoryKeysInfo", null);
__decorate([
    midway_1.put('/keyInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "updateRepositoryKeyInfo", null);
__decorate([
    midway_1.post('/changes/push'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], I18nDataController.prototype, "commitAndPushChanges", null);
I18nDataController = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/i18nRepository')
], I18nDataController);
exports.I18nDataController = I18nDataController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4blJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIvaTE4blJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBa0Y7QUFNbEYsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFZN0IsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdELEtBQUssQ0FBQyxxQkFBcUI7UUFDekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdELEtBQUssQ0FBQyxrQkFBa0I7UUFDdEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFHRCxLQUFLLENBQUMsZUFBZTtRQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFN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