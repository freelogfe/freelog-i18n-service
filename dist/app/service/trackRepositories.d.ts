/// <reference path="../../../src/globals.d.ts" />
import { Context } from 'midway';
import { INodegitConfig } from '../../interface/index';
import { INodegitService, IRepository, IRepositoryChanges } from '../../interface/nodegit';
import { IKeysInfoService } from '../../interface/keysInfo';
import { ITrackedRepositoriesService, IRepositoryResult, IReposDirResult } from '../../interface/trackRepositories';
import { IRepositoryInfoService, IRepositoryInfo } from '../../interface/repositoryInfo';
export declare class TrackRepositoriesService implements ITrackedRepositoriesService {
    nodegitConfig: INodegitConfig;
    nodegitService: INodegitService;
    kiService: IKeysInfoService;
    riService: IRepositoryInfoService;
    ctx: Context;
    static cacheScanResults: IRepositoryResult[];
    scanAllRepositories(): Promise<IRepositoryResult[]>;
    scanRepository(repositoryName: string): Promise<IRepositoryResult | null>;
    getRepositoryI18nDir(reposInfo: IRepositoryInfo, tragetDirPath: string): IReposDirResult[];
    formatRepositoryI18nDir(repositoryName: string, reposI18nDir: IReposDirResult[]): IReposDirResult[];
    getRepositoryChanges(repositoryName: string): Promise<IRepositoryChanges>;
    cloneAllTrackedRepositories(): Promise<void>;
    cloneTrackedRepository(reposName: string): Promise<IRepository>;
}
