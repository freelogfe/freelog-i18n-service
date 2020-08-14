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
        const { name, moduleName, repositoryName, description, tags = [], values = [] } = body;
        const condition = { name, moduleName, repositoryName };
        const res = await this.dal.keyInfo.findOneAndUpdate(condition, { description, tags, values }, { new: true });
        this.ctx.success(res);
    }
    async deleteKeyInfo() {
        const condition = this.ctx.request.body;
        const res = await this.dal.keyInfo.deleteOne(condition);
        this.ctx.success(res);
    }
    async list() {
        const condition = this.ctx.query;
        // const projection: string [] = []
        const res = await this.dal.keyInfo.find(condition);
        this.ctx.success(res);
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
NodeReport = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/i18nKeyInfos')
], NodeReport);
exports.default = NodeReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5SW5mb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXIva2V5SW5mb3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEY7QUFLMUYsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFVO0lBUzdCLEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxTQUFTLEdBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQzdDLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFHRCxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFHRCxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3RGLE1BQU0sU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsQ0FBQTtRQUN0RCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM1RyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBR0QsS0FBSyxDQUFDLGFBQWE7UUFDakIsTUFBTSxTQUFTLEdBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNwRCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBR0QsS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLFNBQVMsR0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDN0MsbUNBQW1DO1FBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7Q0FFRixDQUFBO0FBM0NDO0lBREMsZUFBTSxFQUFFOzt1Q0FDRztBQUdaO0lBREMsZUFBTSxFQUFFOzt1Q0FDRDtBQUdSO0lBREMsWUFBRyxDQUFDLEdBQUcsQ0FBQzs7Ozs0Q0FLUjtBQUdEO0lBREMsYUFBSSxDQUFDLEdBQUcsQ0FBQzs7OzsrQ0FLVDtBQUdEO0lBREMsWUFBRyxDQUFDLEdBQUcsQ0FBQzs7OzsrQ0FPUjtBQUdEO0lBREMsWUFBRyxDQUFDLEdBQUcsQ0FBQzs7OzsrQ0FLUjtBQUdEO0lBREMsWUFBRyxDQUFDLE9BQU8sQ0FBQzs7OztzQ0FNWjtBQTVDa0IsVUFBVTtJQUY5QixnQkFBTyxFQUFFO0lBQ1QsbUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQztHQUNWLFVBQVUsQ0E4QzlCO2tCQTlDb0IsVUFBVSJ9