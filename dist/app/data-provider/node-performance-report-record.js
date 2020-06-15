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
let WebReportRecordProvider = class WebReportRecordProvider extends MongoBaseOperation {
    constructor(app) {
        super(app.model.NodePerformanceReportRecord);
    }
};
WebReportRecordProvider = __decorate([
    midway_1.provide(),
    __metadata("design:paramtypes", [midway_1.Application])
], WebReportRecordProvider);
exports.default = WebReportRecordProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wZXJmb3JtYW5jZS1yZXBvcnQtcmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9kYXRhLXByb3ZpZGVyL25vZGUtcGVyZm9ybWFuY2UtcmVwb3J0LXJlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZGQUE2RjtBQUM3RixtQ0FBNkM7QUFHN0MsSUFBcUIsdUJBQXVCLEdBQTVDLE1BQXFCLHVCQUF3QixTQUFRLGtCQUFrQjtJQUNyRSxZQUFZLEdBQWdCO1FBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUE7SUFDOUMsQ0FBQztDQUNGLENBQUE7QUFKb0IsdUJBQXVCO0lBRDNDLGdCQUFPLEVBQUU7cUNBRVMsb0JBQVc7R0FEVCx1QkFBdUIsQ0FJM0M7a0JBSm9CLHVCQUF1QiJ9