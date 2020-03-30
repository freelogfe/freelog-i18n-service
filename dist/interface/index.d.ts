export interface PlainObject {
    [key: string]: any;
}
/**
 * @description response
 */
export interface FreelogResponse {
    ret: number;
    errcode: number;
    msg: string;
    data: PlainObject | null;
}
export interface CurlRequestOption {
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'TRACE' | 'CONNECT' | undefined;
    data?: any;
    dataType?: string;
    headers?: PlainObject;
    timeout?: number;
    auth?: string;
    followRedirect?: boolean;
    gzip?: boolean;
}
export interface INodegitConfig {
    user: INodegitUser;
    i18nRepositoriesDirPath: string;
    i18nRemote: string;
    trackedRepositories: ITrackedRepositoriesMap;
}
export interface INodegitUser {
    name: string;
    password: string;
    token?: string;
    email?: string;
}
interface ITrackedRepositoriesMap {
    [repositoryName: string]: ITrackedRepository;
}
export interface ITrackedRepository {
    reposI18nPath: string;
    reposUrl: string;
    reposI18nBranch: string;
}
export declare type nextDefinition = () => Promise<void>;
export {};
