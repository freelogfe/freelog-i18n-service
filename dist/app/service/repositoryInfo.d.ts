/// <reference path="../../../src/globals.d.ts" />
import { INodegitConfig } from '../../interface/index';
import { IRepositoryInfoService, IRepositoryInfoResult } from '../../interface/repositoryInfo';
export declare class RepositoryInfoService implements IRepositoryInfoService {
    nodegitConfig: INodegitConfig;
    getRepositoryInfo(repositoryName: string): IRepositoryInfoResult;
}
