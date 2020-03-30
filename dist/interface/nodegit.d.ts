import { Repository, Reference, Signature } from 'nodegit';
import { INodegitUser } from './index';
import { IRepositoryInfoResult } from './repositoryInfo';
export declare type IRepository = Repository | Error | null;
export declare type IReference = Reference | Error | null;
export interface ICheckResult {
    isOK: boolean;
    isCloned: boolean;
    dirs: [];
}
export interface IRepositoryChange {
    type: string;
    path: string;
}
export declare type IRepositoryChanges = IRepositoryChange[];
export interface INodegitService {
    openRepositoryByName(repositoryName: string): Promise<IRepository>;
    checkRepository(targetReposName: string): Promise<ICheckResult>;
    cloneRepository(reposInfo: IRepositoryInfoResult, userConfig: INodegitUser): Promise<IRepository>;
    createNewBranch(repository: Repository, brName: string): Promise<IReference>;
    checkRemoteBranch(repository: Repository, brName: string): Promise<IReference>;
    getChangesByStatus(repository: Repository): Promise<IRepositoryChanges>;
    addAndCommit(repository: Repository, userName: string, userEmail: string, commitMsg: string): Promise<string>;
    commitAllFiles(repository: Repository, changes: IRepositoryChanges, signature: Signature, commitMsg: string): Promise<string>;
    pull(repository: Repository, branch: string): Promise<void>;
    push(repository: Repository, remote: string, userConfig: INodegitUser, accessToken: string): Promise<void>;
    setSparseCheckout(reposDirName: string, i18nDirPath: string, repository: any): Promise<void>;
}
