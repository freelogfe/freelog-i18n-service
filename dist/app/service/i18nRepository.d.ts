import { Context } from 'midway';
import { INodegitConfig, PlainObject } from '../../interface';
import { II18nRepositorySerive } from '../../interface/i18nRepository';
import { IRepositoryInfoService } from '../../interface/repositoryInfo';
export declare class I18nRepositorySerive implements II18nRepositorySerive {
    ctx: Context;
    nodegitConfig: INodegitConfig;
    riService: IRepositoryInfoService;
    getAllI18nData(): Promise<PlainObject>;
    /**
     * pathType (String):
     * 1: 文件路径，如packages/@freelog/freelog-i18n/console/en/common.json
     * 2: lang文件夹路径：如packages/@freelog/freelog-i18n/console/en
     * 3: module文件夹路径：如packages/@freelog/freelog-i18n/console
     */
    getI18nDataByPath(): Promise<PlainObject>;
    getI18nByDirPath(dirPath: string): PlainObject;
}
