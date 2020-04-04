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
const path = require("path");
const fse = require("fs-extra");
const objectPath = require("object-path");
const nodegit = require("nodegit");
const midway_1 = require("midway");
let I18nRepositorySerive = class I18nRepositorySerive {
    async getAllI18nData() {
        const { repositoryName } = this.ctx.query;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo == null) {
            throw new Error(`仓库${repositoryName}不存在！`);
        }
        const result = {};
        const { reposI18nPath } = reposInfo;
        fse.readdirSync(reposI18nPath).filter((moduleName) => {
            return fse.statSync(path.join(reposI18nPath, moduleName)).isDirectory();
        }).forEach((moduleName) => {
            const modulePath = path.join(reposI18nPath, moduleName);
            for (const language of fse.readdirSync(modulePath)) {
                const data = this.getI18nByDirPath(path.join(modulePath, language));
                objectPath.set(result, [repositoryName, moduleName, language], data);
            }
        });
        return result;
    }
    /**
     * pathType (String):
     * 1: 文件路径，如packages/@freelog/freelog-i18n/console/en/common.json
     * 2: lang文件夹路径：如packages/@freelog/freelog-i18n/console/en
     * 3: module文件夹路径：如packages/@freelog/freelog-i18n/console
     */
    async getI18nDataByPath() {
        const { targetPath, pathType, repositoryName } = this.ctx.query;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo == null) {
            throw new Error(`仓库${repositoryName}不存在！`);
        }
        const result = {};
        let tmpPath = decodeURIComponent(targetPath).replace(/^(\/)|(\/)$/g, '');
        tmpPath = path.join(reposInfo.reposDirPath, tmpPath);
        switch (+pathType) {
            case 1: {
                const [moduleName, lang, _file] = tmpPath.split('/').slice(-3);
                if (/(\.json)$/.test(_file)) {
                    const fileName = _file.replace(/(\.json)$/i, '');
                    const data = fse.readJSONSync(tmpPath);
                    if (fileName === 'index') {
                        objectPath.set(result, [repositoryName, moduleName, lang], data);
                    }
                    else {
                        objectPath.set(result, [repositoryName, moduleName, lang, fileName], data);
                    }
                }
                break;
            }
            case 2: {
                const [moduleName, lang] = tmpPath.split('/').slice(-2);
                const data = this.getI18nByDirPath(tmpPath);
                objectPath.set(result, [repositoryName, moduleName, lang], data);
                break;
            }
            case 3: {
                const [moduleName] = tmpPath.split('/').slice(-1);
                for (const lang of fse.readdirSync(tmpPath)) {
                    const data = this.getI18nByDirPath(path.join(tmpPath, lang));
                    objectPath.set(result, [repositoryName, moduleName, lang], data);
                }
                break;
            }
            default:
        }
        return result;
    }
    getI18nByDirPath(dirPath) {
        console.log('[GetI18n dirPath]:', dirPath);
        let result = {};
        const files = fse.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fse.statSync(filePath);
            if (/(\.json)$/.test(file) && stats.isFile()) {
                const fileName = file.replace(/(\.json)$/i, '');
                const data = fse.readJSONSync(path.join(dirPath, file));
                if (fileName === 'index') {
                    result = Object.assign(result, data);
                }
                else {
                    result[fileName] = data;
                }
            }
        }
        return result;
    }
    async updateI18nData() {
        const { repositoryName, changedFiles } = this.ctx.request.body;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo == null) {
            throw new Error(`仓库${repositoryName}不存在！`);
        }
        for (const item of changedFiles) {
            const filePath = path.join(reposInfo.reposDirPath, item.targetPath);
            if (fse.pathExistsSync(filePath)) {
                fse.writeFileSync(filePath, item.targetJSONString);
            }
        }
        let repositoryChanges = [];
        const [repository] = await this.nodegitService.openRepositoryByName(repositoryName);
        if (repository instanceof nodegit.Repository) {
            repositoryChanges = await this.nodegitService.getChangesByStatus(repository);
            // repositoryChanges = repositoryStatusMap.saveChanges(repositoryName, [ ...repositoryChanges ])
        }
        return repositoryChanges;
    }
    async creaetNewModule() {
        const { repositoryName, moduleName, languages } = this.ctx.request.body;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo == null) {
            throw new Error(`仓库${repositoryName}不存在！`);
        }
        const { reposI18nPath } = reposInfo;
        for (const lang of languages) {
            const fileName = path.join(reposI18nPath, moduleName, lang, 'index.json');
            fse.ensureFileSync(fileName);
            fse.writeJsonSync(fileName, {});
        }
        const result = await this.trService.scanAllRepositories();
        return result;
    }
    async deleteModule() {
        const { repositoryName, moduleName } = this.ctx.request.body;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo == null) {
            throw new Error(`仓库${repositoryName}不存在！`);
        }
        const reposModuleDirPath = path.join(reposInfo.reposI18nPath, moduleName);
        fse.removeSync(reposModuleDirPath);
        const result = await this.trService.scanAllRepositories();
        return result;
    }
    async downloadI18nFile() {
        const ctx = this.ctx;
        const { filePath, repositoryName } = this.ctx.query;
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo != null) {
            const fileName = filePath.split('/').pop();
            const _filePath = path.join(reposInfo.reposDirPath, filePath);
            ctx.attachment(fileName);
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.body = fse.createReadStream(_filePath);
        }
    }
    async pullRepository() {
        const { repositoryName } = this.ctx.query;
        const [repository, repositoryInfo] = await this.nodegitService.openRepositoryByName(repositoryName);
        if (repository instanceof nodegit.Repository && repositoryInfo != null) {
            await this.nodegitService.pull(repository, repositoryInfo.reposI18nBranch);
            const changes = await this.nodegitService.getChangesByStatus(repository);
            return changes;
        }
        return [];
    }
    async commitAndPushChanges() {
        const { repositoryName, commitMsg, accessToken } = this.ctx.request.body;
        const nodegitConfig = this.nodegitConfig;
        const [repository] = await this.nodegitService.openRepositoryByName(repositoryName);
        if (repository instanceof nodegit.Repository) {
            const { user, i18nRemote } = nodegitConfig;
            await this.nodegitService.addAndCommit(repository, user.name, user.email || '', commitMsg);
            // await pull(repository, nodegitConfig)
            // console.log(`[Pull success]: ${repositoryName}`)
            await this.nodegitService.push(repository, i18nRemote, user, accessToken);
            console.log('[Push success]');
        }
        // return repositoryStatusMap.clearChanges(repositoryName)
    }
    async checkRepository() {
        const { repositoryName } = this.ctx.query;
        const result = await this.nodegitService.checkRepository(repositoryName);
        return result;
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], I18nRepositorySerive.prototype, "ctx", void 0);
__decorate([
    midway_1.config('nodegit'),
    __metadata("design:type", Object)
], I18nRepositorySerive.prototype, "nodegitConfig", void 0);
__decorate([
    midway_1.inject('repositoryInfoService'),
    __metadata("design:type", Object)
], I18nRepositorySerive.prototype, "riService", void 0);
__decorate([
    midway_1.inject('nodegitService'),
    __metadata("design:type", Object)
], I18nRepositorySerive.prototype, "nodegitService", void 0);
__decorate([
    midway_1.inject('trackRepositoriesService'),
    __metadata("design:type", Object)
], I18nRepositorySerive.prototype, "trService", void 0);
I18nRepositorySerive = __decorate([
    midway_1.provide('i18nRepositorySerive')
], I18nRepositorySerive);
exports.I18nRepositorySerive = I18nRepositorySerive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4blJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvaTE4blJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsbUNBQXlEO0FBU3pELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBaUIvQixLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNsRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLGNBQWMsTUFBTSxDQUFDLENBQUE7U0FDM0M7UUFDRCxNQUFNLE1BQU0sR0FBZ0IsRUFBRSxDQUFBO1FBQzlCLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxTQUFTLENBQUE7UUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFDM0QsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDekUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZELEtBQUssTUFBTSxRQUFRLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7Z0JBQ25FLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTthQUN2RTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsaUJBQWlCO1FBQ3JCLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxDQUFBO1NBQzNDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLElBQUksT0FBTyxHQUFXLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDaEYsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUVwRCxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDaEUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMzQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDaEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDdEMsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO3dCQUN4QixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7cUJBQ25FO3lCQUFNO3dCQUNMLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7cUJBQzdFO2lCQUNGO2dCQUNELE1BQUs7YUFDTjtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFFLFVBQVUsRUFBRSxJQUFJLENBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzNDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDbEUsTUFBSzthQUNOO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUUsVUFBVSxDQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDbkQsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDNUQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBRSxFQUFFLElBQUksQ0FBQyxDQUFBO2lCQUNuRTtnQkFDRCxNQUFLO2FBQ047WUFDRCxRQUFRO1NBQ1Q7UUFDRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFlO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDMUMsSUFBSSxNQUFNLEdBQWdCLEVBQUUsQ0FBQTtRQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3RDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLE1BQU0sUUFBUSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ2pELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDcEMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ3ZELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDdkQsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO29CQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7aUJBQ3JDO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUE7aUJBQ3hCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQzlELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxDQUFBO1NBQzNDO1FBQ0QsS0FBSyxNQUFNLElBQUksSUFBSSxZQUFZLEVBQUU7WUFDL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNuRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2hDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2FBQ25EO1NBQ0Y7UUFDRCxJQUFJLGlCQUFpQixHQUF1QixFQUFFLENBQUE7UUFDOUMsTUFBTSxDQUFFLFVBQVUsQ0FBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNyRixJQUFJLFVBQVUsWUFBWSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQzVDLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUM1RSxnR0FBZ0c7U0FDakc7UUFDRCxPQUFPLGlCQUFpQixDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZTtRQUNuQixNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDdkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNsRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLGNBQWMsTUFBTSxDQUFDLENBQUE7U0FDM0M7UUFDRCxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsU0FBUyxDQUFBO1FBQ25DLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDekUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUNoQztRQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQ3pELE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQzVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxDQUFBO1NBQzNDO1FBQ0QsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDekUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQ3pELE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNwQixNQUFNLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQzdELEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQTtZQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUMzQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDekMsTUFBTSxDQUFFLFVBQVUsRUFBRSxjQUFjLENBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDckcsSUFBSSxVQUFVLFlBQVksT0FBTyxDQUFDLFVBQVUsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO1lBQ3RFLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUMxRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDeEUsT0FBTyxPQUFPLENBQUE7U0FDZjtRQUNELE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVELEtBQUssQ0FBQyxvQkFBb0I7UUFDeEIsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ3hFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDeEMsTUFBTSxDQUFFLFVBQVUsQ0FBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNyRixJQUFJLFVBQVUsWUFBWSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQzVDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsYUFBYSxDQUFBO1lBQzFDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDMUYsd0NBQXdDO1lBQ3hDLG1EQUFtRDtZQUNuRCxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUM5QjtRQUNELDBEQUEwRDtJQUM1RCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWU7UUFDbkIsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDeEUsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQXBNQztJQURDLGVBQU0sRUFBRTs7aURBQ0c7QUFHWjtJQURDLGVBQU0sQ0FBQyxTQUFTLENBQUM7OzJEQUNXO0FBRzdCO0lBREMsZUFBTSxDQUFDLHVCQUF1QixDQUFDOzt1REFDQztBQUdqQztJQURDLGVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7NERBQ007QUFHL0I7SUFEQyxlQUFNLENBQUMsMEJBQTBCLENBQUM7O3VEQUNHO0FBZjNCLG9CQUFvQjtJQURoQyxnQkFBTyxDQUFDLHNCQUFzQixDQUFDO0dBQ25CLG9CQUFvQixDQXVNaEM7QUF2TVksb0RBQW9CIn0=