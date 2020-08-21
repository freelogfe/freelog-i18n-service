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
const utils_1 = require("../shared/utils");
let NodeReport = class NodeReport {
    async getKeyInfo() {
        const condition = this.ctx.query;
        const res = await this.dal.keyInfo.findOne(condition);
        this.ctx.success(res);
    }
    async createKeyInfo() {
        const body = this.ctx.request.body;
        const res = await this.dal.keyInfo.create(body);
        this.ctx.success(res);
    }
    async updateKeyInfo() {
        const body = this.ctx.request.body;
        const { name, moduleName, repositoryName, description, tags } = body;
        const condition = { name, moduleName, repositoryName };
        const update = {};
        if (description != null) {
            update['description'] = description;
        }
        if (tags != null) {
            update['tags'] = tags;
        }
        console.log('[update]:', update);
        const res = await this.dal.keyInfo.findOneAndUpdate(condition, update, { new: true });
        if (res != null) {
            this.ctx.success(res);
        }
        else {
            this.ctx.error({ data: null, msg: '标签更新操作失败！' });
        }
    }
    async deleteKeyInfo() {
        const condition = this.ctx.request.body;
        const res = await this.dal.keyInfo.deleteOne(condition);
        this.ctx.success(res);
    }
    async list() {
        const queryOpts = this.ctx.query;
        const { tags, keys } = queryOpts;
        if (utils_1.isEmpty(tags) && utils_1.isEmpty(keys)) {
            this.ctx.error({ data: null, msg: '缺少参数tags或keys！' });
            return;
        }
        const condition = {};
        if (!utils_1.isEmpty(tags)) {
            condition['tags'] = { $in: tags.split(',') };
        }
        if (!utils_1.isEmpty(keys)) {
            condition['name'] = { $in: keys.split(',') };
        }
        const res = await this.dal.keyInfo.find(condition);
        this.ctx.success(res);
    }
    async allKeyInfos() {
        const res = await this.dal.keyInfo.find({});
        this.ctx.success(res);
    }
    async updateTags() {
        const body = this.ctx.request.body;
        const { repositoryName, selectedTag, newTag } = body;
        const res = await this.dal.keyInfo.updateMany({ tags: selectedTag, repositoryName }, { $set: { 'tags.$': newTag } }, { new: true });
        if (res.ok === 1 && res.nModified > 0) {
            const result = await this.dal.keyInfo.find({ tags: newTag, repositoryName });
            this.ctx.success(result);
        }
        else {
            this.ctx.error({ data: null, msg: '标签更新失败！' });
        }
    }
    async createOrUpdateTags() {
        const { newTag, repositoryName, checkedKeyList } = this.ctx.request.body;
        const nameArr = checkedKeyList.map((item) => item.name);
        const existedKeyInfos = await this.dal.keyInfo.find({ name: { $in: nameArr }, repositoryName });
        const existedKeys = existedKeyInfos.map((keyInfo) => keyInfo.name);
        const newKeyInfos = checkedKeyList.filter((keyInfo) => {
            if (existedKeys.indexOf(keyInfo.name) === -1) {
                keyInfo.tags = [newTag];
                return true;
            }
            return false;
        });
        const operations = [
            ...newKeyInfos.map((keyInfo) => {
                return {
                    insertOne: {
                        document: keyInfo
                    }
                };
            }),
            ...existedKeyInfos.map((keyInfo) => {
                return {
                    updateOne: {
                        filter: { _id: keyInfo._id },
                        update: { $addToSet: { tags: newTag } }
                    }
                };
            })
        ];
        const result = await this.dal.keyInfo.model.bulkWrite(operations);
        this.ctx.success(result);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], NodeReport.prototype, "ctx", void 0);
__decorate([
    midway_1.plugin(),
    __metadata("design:type", Object)
], NodeReport.prototype, "dal", void 0);
__decorate([
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "getKeyInfo", null);
__decorate([
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "createKeyInfo", null);
__decorate([
    midway_1.put('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "updateKeyInfo", null);
__decorate([
    midway_1.del('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "deleteKeyInfo", null);
__decorate([
    midway_1.get('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "list", null);
__decorate([
    midway_1.get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "allKeyInfos", null);
__decorate([
    midway_1.put('/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "updateTags", null);
__decorate([
    midway_1.post('/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "createOrUpdateTags", null);
NodeReport = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/i18nKeyInfos')
], NodeReport);
exports.default = NodeReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5SW5mb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIva2V5SW5mb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEY7QUFFMUYsMkNBQXlDO0FBSXpDLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVTtJQVM3QixLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sU0FBUyxHQUFnQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUM3QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBR0QsS0FBSyxDQUFDLGFBQWE7UUFDakIsTUFBTSxJQUFJLEdBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUMvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBR0QsS0FBSyxDQUFDLGFBQWE7UUFDakIsTUFBTSxJQUFJLEdBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUMvQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwRSxNQUFNLFNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLENBQUE7UUFDdEQsTUFBTSxNQUFNLEdBQWdCLEVBQUUsQ0FBQTtRQUM5QixJ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