import { PlainObject } from './index';
export interface IKeysInfoService {
    getKeysInfoFilePath(repositoryName: string): Promise<any>;
    ensureKeysInfoFile(repositoryName: string): Promise<any>;
    readKeysInfoFile(repositoryName: string): Promise<any>;
    getKeyInfo(repositoryName: string, moduleName: string, key: string): Promise<any>;
    updateKeyInfo(repositoryName: string, moduleName: string, key: string, info: PlainObject): Promise<void>;
}
