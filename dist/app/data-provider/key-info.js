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
const MongoBaseOperation = require("egg-freelog-database/lib/database/mongo-base-operation");
const midway_1 = require("midway");
let I18nKeyInfoProvider = class I18nKeyInfoProvider extends MongoBaseOperation {
    constructor(app) {
        super(app.model.KeyInfo);
    }
};
I18nKeyInfoProvider = __decorate([
    midway_1.provide(),
    __metadata("design:paramtypes", [midway_1.Application])
], I18nKeyInfoProvider);
exports.default = I18nKeyInfoProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2RhdGEtcHJvdmlkZXIva2V5LWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2RkFBNkY7QUFDN0YsbUNBQTZDO0FBRzdDLElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxrQkFBa0I7SUFDakUsWUFBWSxHQUFnQjtRQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQUpvQixtQkFBbUI7SUFEdkMsZ0JBQU8sRUFBRTtxQ0FFUyxvQkFBVztHQURULG1CQUFtQixDQUl2QztrQkFKb0IsbUJBQW1CIn0=