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
    async createRecord() {
        const body = this.ctx.request.body;
        const res = await this.dal.nodePerformanceReportRecord.create(body);
        this.ctx.success(res);
    }
    async list() {
        const condition = {};
        const projection = [];
        const res = await this.dal.nodePerformanceReportRecord.findPageList(condition, 1, 50, projection.join(' '));
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
    midway_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "createRecord", null);
__decorate([
    midway_1.get('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodeReport.prototype, "list", null);
NodeReport = __decorate([
    midway_1.provide(),
    midway_1.controller('/v1/nodeReport')
], NodeReport);
exports.default = NodeReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZVJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ub2RlUmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWdGO0FBS2hGLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVTtJQVM3QixLQUFLLENBQUMsWUFBWTtRQUNoQixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQy9DLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUdELEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLE1BQU0sVUFBVSxHQUFjLEVBQUUsQ0FBQTtRQUNoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMzRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2QixDQUFDO0NBQ0YsQ0FBQTtBQW5CQztJQURDLGVBQU0sRUFBRTs7dUNBQ0c7QUFHWjtJQURDLGVBQU0sRUFBRTs7dUNBQ0Q7QUFHUjtJQURDLGFBQUksQ0FBQyxHQUFHLENBQUM7Ozs7OENBS1Q7QUFHRDtJQURDLFlBQUcsQ0FBQyxPQUFPLENBQUM7Ozs7c0NBTVo7QUFyQmtCLFVBQVU7SUFGOUIsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsZ0JBQWdCLENBQUM7R0FDUixVQUFVLENBc0I5QjtrQkF0Qm9CLFVBQVUifQ==