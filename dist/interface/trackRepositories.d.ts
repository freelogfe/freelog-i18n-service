import { IRepository, IRepositoryChanges } from './nodegit';
import { IRepositoryInfo } from './repositoryInfo';
export interface IReposDirResult {
    name: string;
    path: string;
    fileName?: string;
    language?: string;
    keys?: string[];
    keysType?: string;
    children?: IReposDirResult[];
}
export interface IRepositoryResult {
    repositoryName: string;
    repositoryUrl: string;
    repositoryI18nBranch: string;
    directoryTree: IReposDirResult[];
    repositoryChanges: IRepositoryChanges;
}
export interface ITrackedRepositoriesService {
    scanAllRepositories(): Promise<IRepositoryResult[]>;
    scanRepository(repositoryName: string): Promise<IRepositoryResult | null>;
    getRepositoryI18nDir(reposInfo: IRepositoryInfo, tragetDirPath: string): IReposDirResult[];
    cloneAllTrackedRepositories(): Promise<void>;
    cloneTrackedRepository(reposName: string): Promise<IRepository>;
}
