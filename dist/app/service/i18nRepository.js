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
I18nRepositorySerive = __decorate([
    midway_1.provide('i18nRepositorySerive')
], I18nRepositorySerive);
exports.I18nRepositorySerive = I18nRepositorySerive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4blJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2UvaTE4blJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDLDBDQUEwQztBQUMxQyxtQ0FBeUQ7QUFPekQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFXL0IsS0FBSyxDQUFDLGNBQWM7UUFDbEIsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxjQUFjLE1BQU0sQ0FBQyxDQUFBO1NBQzNDO1FBQ0QsTUFBTSxNQUFNLEdBQWdCLEVBQUUsQ0FBQTtRQUM5QixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsU0FBUyxDQUFBO1FBQ25DLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQzNELE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3pFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUNoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUN2RCxLQUFLLE1BQU0sUUFBUSxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2xELE1B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