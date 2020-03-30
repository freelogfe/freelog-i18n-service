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
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const path = require("path");
const midway_1 = require("midway");
let RepositoryInfoService = class RepositoryInfoService {
    getRepositoryInfo(repositoryName) {
        const { trackedRepositories, i18nRepositoriesDirPath } = this.nodegitConfig;
        for (const reposName in trackedRepositories) {
            const { reposUrl, reposI18nPath, reposI18nBranch } = trackedRepositories[reposName];
            if (reposName === repositoryName) {
                const reposDirPath = path.resolve(process.cwd(), i18nRepositoriesDirPath, reposName);
                return {
                    reposName,
                    reposUrl,
                    reposDirPath,
                    reposI18nPath: path.join(reposDirPath, reposI18nPath),
                    reposI18nBranch,
                };
            }
        }
        return null;
    }
};
__decorate([
    midway_1.config('nodegit'),
    __metadata("design:type", Object)
], RepositoryInfoService.prototype, "nodegitConfig", void 0);
RepositoryInfoService = __decorate([
    midway_1.provide('repositoryInfoService')
], RepositoryInfoService);
exports.RepositoryInfoService = RepositoryInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3NpdG9yeUluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvcmVwb3NpdG9yeUluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDZCQUE4QjtBQUM5QixtQ0FBd0M7QUFLeEMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFLaEMsaUJBQWlCLENBQUMsY0FBc0I7UUFDdEMsTUFBTSxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUMzRSxLQUFLLE1BQU0sU0FBUyxJQUFJLG1CQUFtQixFQUFFO1lBQzNDLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ25GLElBQUksU0FBUyxLQUFLLGNBQWMsRUFBRTtnQkFDaEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUE7Z0JBQ3BGLE9BQU87b0JBQ0wsU0FBUztvQkFDVCxRQUFRO29CQUNSLFlBQVk7b0JBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDckQsZUFBZTtpQkFDaEIsQ0FBQTthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7Q0FDRixDQUFBO0FBbkJDO0lBREMsZUFBTSxDQUFDLFNBQVMsQ0FBQzs7NERBQ1c7QUFIbEIscUJBQXFCO0lBRGpDLGdCQUFPLENBQUMsdUJBQXVCLENBQUM7R0FDcEIscUJBQXFCLENBc0JqQztBQXRCWSxzREFBcUIifQ==