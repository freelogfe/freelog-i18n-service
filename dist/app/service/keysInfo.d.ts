/// <reference path="../../../src/globals.d.ts" />
import { INodegitConfig, PlainObject } from '../../interface/index';
import { IKeysInfoService } from '../../interface/keysInfo';
import { IRepositoryInfoService } from '../../interface/repositoryInfo';
export declare class KeysInfoService implements IKeysInfoService {
    riService: IRepositoryInfoService;
    nodegitConfig: INodegitConfig;
    getFilePath(repositoryName: string): Promise<string>;
    ensureKeysInfoFile(repositoryName: string): Promise<void>;
    readKeysInfoFile(repositoryName: string): Promise<PlainObject>;
    getKeyInfo(repositoryName: string, moduleName: string, key: string): Promise<any>;
    updateKeyInfo(repositoryName: string, moduleName: string, key: string, info: PlainObject): Promise<void>;
}
