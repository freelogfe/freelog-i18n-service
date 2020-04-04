import { Context } from 'midway';
import { IRepositoryInfoService } from '../../interface/repositoryInfo';
import { ITrackedRepositoriesService } from '../../interface/trackRepositories';
export declare class TrackRepositoriesController {
    ctx: Context;
    riService: IRepositoryInfoService;
    trService: ITrackedRepositoriesService;
    getTrackedRepositories(): Promise<void>;
}
