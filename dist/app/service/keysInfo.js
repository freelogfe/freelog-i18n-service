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
const objectPath = require("object-path");
const midway_1 = require("midway");
const I18N_KEYS_INFO_MAPPING_TABLE = 'keysInfo-mappingTable';
let KeysInfoService = class KeysInfoService {
    async getKeysInfoFilePath(repositoryName) {
        const reposInfo = this.riService.getRepositoryInfo(repositoryName);
        if (reposInfo != null) {
            return path.join(reposInfo.reposI18nPath, `${I18N_KEYS_INFO_MAPPING_TABLE}.json`);
        }
        else {
            return '';
        }
    }
    async ensureKeysInfoFile(repositoryName) {
        const filePath = await this.getKeysInfoFilePath(repositoryName);
        if (!fse.pathExistsSync(filePath)) {
            fse.ensureFileSync(filePath);
            fse.writeJSONSync(filePath, {}, { spaces: '\t' });
        }
    }
    async readKeysInfoFile(repositoryName) {
        const filePath = await this.getKeysInfoFilePath(repositoryName);
        return fse.readJSONSync(filePath);
    }
    async getKeyInfo(repositoryName, moduleName, key) {
        const keyInfoMappingTable = await this.readKeysInfoFile(repositoryName);
        return objectPath.get(keyInfoMappingTable, [moduleName, key]);
    }
    async updateKeyInfo(repositoryName, moduleName, key, info) {
        const filePath = await this.getKeysInfoFilePath(repositoryName);
        const keyInfoMappingTable = await this.readKeysInfoFile(repositoryName);
        console.log('In updateKeyInfo', filePath, keyInfoMappingTable, repositoryName, moduleName, key, info);
        const tmpInfo = objectPath.get(keyInfoMappingTable, [moduleName, key]) || {};
        objectPath.set(keyInfoMappingTable, [moduleName, key], Object.assign(tmpInfo, info));
        fse.writeJSONSync(filePath, keyInfoMappingTable, { spaces: '\t' });
    }
};
__decorate([
    midway_1.inject('repositoryInfoService'),
    __metadata("design:type", Object)
], KeysInfoService.prototype, "riService", void 0);
__decorate([
    midway_1.config('nodegit'),
    __metadata("design:type", Object)
], KeysInfoService.prototype, "nodegitConfig", void 0);
KeysInfoService = __decorate([
    midway_1.provide('keysInfoService')
], KeysInfoService);
exports.KeysInfoService = KeysInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5c0luZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NlcnZpY2Uva2V5c0luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEMsMENBQTBDO0FBQzFDLG1DQUFnRDtBQUtoRCxNQUFNLDRCQUE0QixHQUFHLHVCQUF1QixDQUFBO0FBRzVELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFRMUIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGNBQXNCO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDbEUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEdBQUcsNEJBQTRCLE9BQU8sQ0FBQyxDQUFBO1NBQ2xGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxjQUFzQjtRQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQyxHQUFHLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQ2xEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFzQjtRQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMvRCxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBc0IsRUFBRSxVQUFrQixFQUFFLEdBQVc7UUFDdEUsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN2RSxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBRSxVQUFVLEVBQUUsR0FBRyxDQUFFLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxjQUFzQixFQUFFLFVBQWtCLEVBQUUsR0FBVyxFQUFFLElBQWlCO1FBQzVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDckcsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFFLFVBQVUsRUFBRSxHQUFHLENBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUM5RSxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDdEYsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0NBQ0YsQ0FBQTtBQXhDQztJQURDLGVBQU0sQ0FBQyx1QkFBdUIsQ0FBQzs7a0RBQ0M7QUFHakM7SUFEQyxlQUFNLENBQUMsU0FBUyxDQUFDOztzREFDVztBQU5sQixlQUFlO0lBRDNCLGdCQUFPLENBQUMsaUJBQWlCLENBQUM7R0FDZCxlQUFlLENBMkMzQjtBQTNDWSwwQ0FBZSJ9