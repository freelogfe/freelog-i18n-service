import { Context } from 'midway';
import { IRepositoryInfoService } from '../../interface/repositoryInfo';
import { ITrackedRepositoriesService } from '../../interface/trackRepositories';
export declare class trackRepositoriesController {
    ctx: Context;
    riService: IRepositoryInfoService;
    trService: ITrackedRepositoriesService;
    getTrackedRepositories(): Promise<void>;
}
