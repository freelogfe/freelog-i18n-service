import { Context } from 'midway';
import { II18nRepositorySerive } from '../../interface/i18nRepository';
import { IKeysInfoService } from '../../interface/keysInfo';
export declare class I18nDataController {
    ctx: Context;
    irSerive: II18nRepositorySerive;
    kInfoService: IKeysInfoService;
    getAllI18nFileData(): Promise<void>;
    getI18nFileDataByPath(): Promise<void>;
    updateI18nFileData(): Promise<void>;
    creaetNewModule(): Promise<void>;
    deleteModule(): Promise<void>;
    downloadFile(): Promise<void>;
    checkRepository(): Promise<void>;
    getRepositoryKeysInfo(): Promise<void>;
    updateRepositoryKeyInfo(): Promise<void>;
    commitAndPushChanges(): Promise<void>;
}
