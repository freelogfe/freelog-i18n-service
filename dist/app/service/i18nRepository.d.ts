import { Context } from 'midway';
import { INodegitConfig, PlainObject } from '../../interface';
import { II18nRepositorySerive } from '../../interface/i18nRepository';
import { IRepositoryInfoService } from '../../interface/repositoryInfo';
import { INodegitService, IRepositoryChanges, ICheckResult } from '../../interface/nodegit';
import { ITrackedRepositoriesService, IRepositoryResult } from '../../interface/trackRepositories';
export declare class I18nRepositorySerive implements II18nRepositorySerive {
    ctx: Context;
    nodegitConfig: INodegitConfig;
    riService: IRepositoryInfoService;
    nodegitService: INodegitService;
    trService: ITrackedRepositoriesService;
    getAllI18nData(): Promise<PlainObject>;
    /**
     * pathType (String):
     * 1: 文件路径，如packages/@freelog/freelog-i18n/console/en/common.json
     * 2: lang文件夹路径：如packages/@freelog/freelog-i18n/console/en
     * 3: module文件夹路径：如packages/@freelog/freelog-i18n/console
     */
    getI18nDataByPath(): Promise<PlainObject>;
    getI18nByDirPath(dirPath: string): PlainObject;
    updateI18nData(): Promise<IRepositoryChanges>;
    creaetNewModule(): Promise<IRepositoryResult[]>;
    deleteModule(): Promise<IRepositoryResult[]>;
    downloadI18nFile(): Promise<void>;
    pullRepository(): Promise<IRepositoryChanges>;
    commitAndPushChanges(): Promise<void>;
    checkRepository(): Promise<ICheckResult>;
}
