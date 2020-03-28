
export interface IRepositoryInfo {
  reposName: string
  reposUrl: string
  reposDirPath: string
  reposI18nPath: string
  reposI18nBranch: string
}

export type IRepositoryInfoResult = IRepositoryInfo | null

export interface IRepositoryInfoService {
  getRepositoryInfo(repositoryName: string): IRepositoryInfoResult
}
