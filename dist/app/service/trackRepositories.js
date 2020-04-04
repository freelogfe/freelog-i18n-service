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
var TrackRepositoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const path = require("path");
const fse = require("fs-extra");
const nodegit = require("nodegit");
const midway_1 = require("midway");
let TrackRepositoriesService = TrackRepositoriesService_1 = class TrackRepositoriesService {
    async scanAllRepositories() {
        if (TrackRepositoriesService_1.cacheScanResults != null) {
            return TrackRepositoriesService_1.cacheScanResults;
        }
        else {
            const i18nRepositoriesDirPath = path.resolve(process.cwd(), this.nodegitConfig.i18nRepositoriesDirPath);
            const result = [];
            for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
                if (/^\./.test(repositoryName)) {
                    continue;
                }
                const tmpResult = await this.scanRepository(repositoryName);
                if (tmpResult !== null) {
                    result.push(tmpResult);
                }
            }
            TrackRepositoriesService_1.cacheScanResults = result;
            return result;
        }
        // const i18nRepositoriesDirPath = path.resolve(process.cwd(), this.nodegitConfig.i18nRepositoriesDirPath)
        // const result = []
        // for (const repositoryName of fse.readdirSync(i18nRepositoriesDirPath)) {
        //   if (/^\./.test(repositoryName)) {
        //     continue
        //   }
        //   const tmpResult = await this.scanRepository(repositoryName)
        //   if (tmpResult !== null) {
        //     result.push(tmpResult)
        //   }
        // }
        // TrackRepositoriesService.cacheScanResults = result
        // return result
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
TrackRepositoriesService = TrackRepositoriesService_1 = __decorate([
    midway_1.provide('trackRepositoriesService')
], TrackRepositoriesService);
exports.TrackRepositoriesService = TrackRepositoriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tSZXBvc2l0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvdHJhY2tSZXBvc2l0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esd0NBQXdDO0FBQ3hDLDJDQUEyQztBQUMzQyw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLG1DQUFtQztBQUNuQyxtQ0FBeUQ7QUFVekQsSUFBYSx3QkFBd0IsZ0NBQXJDLE1BQWEsd0JBQXdCO0lBbUJuQyxLQUFLLENBQUMsbUJBQW1CO1FBQ3ZCLElBQUksMEJBQXdCLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO1lBQ3JELE9BQU8sMEJBQXdCLENBQUMsZ0JBQWdCLENBQUE7U0FDakQ7YUFBTTtZQUNMLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBQ3ZHLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNqQixLQUFLLE1BQU0sY0FBYyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsRUFBRTtnQkFDckUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO29CQUM5QixTQUFRO2lCQUNUO2dCQUNELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDM0QsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO29CQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2lCQUN2QjthQUNGO1lBQ0QsMEJBQXdCLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFBO1lBQ2xELE9BQU8sTUFBTSxDQUFBO1NBQ2Q7UUFDRCwwR0FBMEc7UUFDMUcsb0JBQW9CO1FBQ3BCLDJFQUEyRTtRQUMz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