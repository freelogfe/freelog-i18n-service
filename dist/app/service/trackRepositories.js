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
const fse = require("fs-extra");
const nodegit = require("nodegit");
const midway_1 = require("midway");
let TrackRepositoriesService = class TrackRepositoriesService {
    async scanAllRepositories() {
        const i18nRepositoriesDirPath = path.resolve(process.cwd(), this.nodegitConfig.i18nRepositoriesDirPath);
        const result = [];
        for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
            const tmpResult = await this.scanRepository(repositoryName);
            if (tmpResult !== null) {
                result.push(tmpResult);
            }
        }
        return result;
    }
    async scanRepository(repositoryName) {
        await this.kiService.ensureKeysInfoFile(repositoryName);
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo != null) {
            const checkResult = await this.nodegitService.checkRepository(repositoryName);
            if (!checkResult.isOK) {
                return null;
            }
            let reposI18nDir = this.getRepositoryI18nDir(reposInfo, reposInfo.reposI18nPath);
            reposI18nDir = this.formatRepositoryI18nDir(repositoryName, reposI18nDir);
            const repositoryChanges = await this.getRepositoryChanges(repositoryName);
            return {
                repositoryName,
                repositoryUrl: reposInfo.reposUrl,
                repositoryI18nBranch: reposInfo.reposI18nBranch,
                directoryTree: reposI18nDir,
                repositoryChanges,
            };
        }
        return null;
    }
    getRepositoryI18nDir(reposInfo, tragetDirPath) {
        const { reposDirPath } = reposInfo;
        const target = [];
        const targetRegExp = new RegExp(`${reposDirPath}` + '(\/?)');
        for (const tmpName of fse.readdirSync(tragetDirPath)) {
            const tmpPath = path.join(tragetDirPath, tmpName);
            const stats = fse.statSync(tmpPath);
            if (stats.isDirectory()) {
                target.push({
                    name: tmpName,
                    path: tmpPath.replace(targetRegExp, ''),
                    children: this.getRepositoryI18nDir(reposInfo, tmpPath),
                });
            }
            else if (stats.isFile() && /(\.json)$/.test(tmpName)) {
                const fileName = tmpName.replace(/(\.json)$/, '');
                if (fileName !== 'package' && fileName !== 'package-lock') {
                    target.push({
                        name: tmpName,
                        fileName,
                        path: tmpPath.replace(targetRegExp, ''),
                    });
                }
            }
        }
        return target;
    }
    formatRepositoryI18nDir(repositoryName, reposI18nDir) {
        reposI18nDir = reposI18nDir.filter((_module) => _module.fileName == null);
        reposI18nDir.forEach((_module) => {
            _module.keys = [repositoryName, _module.name];
            _module.keysType = 'module';
            if (_module.children) {
                _module.children.forEach(lang => {
                    lang.keys = [repositoryName, _module.name, lang.name];
                    lang.keysType = 'language';
                    if (lang.children) {
                        lang.children.forEach(file => {
                            file.keys = [repositoryName, _module.name, lang.name];
                            if (file.fileName != null) {
                                file.keys.push(file.fileName);
                            }
                            file.keysType = 'file';
                            file.language = lang.name;
                        });
                    }
                });
            }
        });
        return reposI18nDir;
    }
    async getRepositoryChanges(repositoryName) {
        const repository = await this.nodegitService.openRepositoryByName(repositoryName);
        if (repository instanceof nodegit.Repository) {
            const repositoryChanges = await this.nodegitService.getChangesByStatus(repository);
            // repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
            return repositoryChanges;
        }
        else {
            return [];
        }
    }
    async cloneAllTrackedRepositories() {
        console.log('[Track Repositories]: start cloning!');
        const repositories = [];
        const { trackedRepositories } = this.nodegitConfig;
        for (const repositoryName of Object.keys(trackedRepositories)) {
            const repository = await this.cloneTrackedRepository(repositoryName);
            repositories.push({ repositoryName, repository });
        }
        repositories.forEach(async ({ repositoryName, repository }) => {
            const reposInfo = this.riService.getRepositoryInfo(repositoryName);
            if (repository instanceof nodegit.Repository) {
                if (reposInfo != null) {
                    await this.nodegitService.checkRemoteBranch(repository, reposInfo.reposI18nBranch);
                }
            }
        });
    }
    async cloneTrackedRepository(reposName) {
        const reposInfo = this.riService.getRepositoryInfo(reposName);
        let repository = null;
        if (reposInfo != null) {
            const { reposDirPath } = reposInfo;
            repository = await nodegit.Repository.open(reposDirPath).catch((e) => e);
            if (repository instanceof nodegit.Repository) {
                console.log(`Repository '${reposName}' already exists!`);
            }
            else {
                if (fse.pathExistsSync(reposDirPath)) {
                    fse.removeSync(reposDirPath);
                }
                repository = await this.nodegitService.cloneRepository(reposInfo, this.nodegitConfig.user);
            }
        }
        return repository;
    }
};
__decorate([
    midway_1.config('nodegit'),
    __metadata("design:type", Object)
], TrackRepositoriesService.prototype, "nodegitConfig", void 0);
__decorate([
    midway_1.inject('nodegitService'),
    __metadata("design:type", Object)
], TrackRepositoriesService.prototype, "nodegitService", void 0);
__decorate([
    midway_1.inject('keysInfoService'),
    __metadata("design:type", Object)
], TrackRepositoriesService.prototype, "kiService", void 0);
__decorate([
    midway_1.inject('repositoryInfoService'),
    __metadata("design:type", Object)
], TrackRepositoriesService.prototype, "riService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], TrackRepositoriesService.prototype, "ctx", void 0);
TrackRepositoriesService = __decorate([
    midway_1.provide('trackRepositoriesService')
], TrackRepositoriesService);
exports.TrackRepositoriesService = TrackRepositoriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSZXBvc2l0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvdHJhY2tSZXBvc2l0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEMsbUNBQW1DO0FBQ25DLG1DQUF5RDtBQVV6RCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQWlCbkMsS0FBSyxDQUFDLG1CQUFtQjtRQUN2QixNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUN2RyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDakIsS0FBSyxNQUFNLGNBQWMsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDckUsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzNELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTthQUN2QjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxjQUFzQjtRQUN6QyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNsRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGVB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