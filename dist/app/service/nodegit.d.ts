/// <reference path="../../../src/globals.d.ts" />
import { Repository, Signature } from 'nodegit';
import { PlainObject, INodegitUser, INodegitConfig } from '../../interface/index';
import { INodegitService, ICheckResult, IRepositoryChanges, IRepository, IReference } from '../../interface/nodegit';
import { IRepositoryInfoService, IRepositoryInfo } from '../../interface/repositoryInfo';
export declare class NodegitService implements INodegitService {
    static cloneStatus: PlainObject;
    nodegitConfig: INodegitConfig;
    riService: IRepositoryInfoService;
    openRepositoryByName(repositoryName: string): Promise<IRepository>;
    checkRepository(repositoryName: string): Promise<ICheckResult>;
    cloneRepository(reposInfo: IRepositoryInfo, userConfig: INodegitUser): Promise<IRepository>;
    createNewBranch(repository: Repository, brName: string): Promise<IReference>;
    checkRemoteBranch(repository: Repository, brName: string): Promise<IReference>;
    getChangesByStatus(repository: Repository): Promise<IRepositoryChanges>;
    addAndCommit(repository: Repository, userName: string, userEmail: string, commitMsg: string): Promise<string>;
    commitAllFiles(repository: Repository, changes: IRepositoryChanges, signature: Signature, commitMsg: string): Promise<string>;
    pull(repository: Repository, branch: string): Promise<void>;
    push(repository: Repository, remote: string, nodegitUser: INodegitUser, accessToken: string): Promise<void>;
    setSparseCheckout(reposDirName: string, i18nDirPath: string, repository: any): Promise<void>;
}
