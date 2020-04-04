import { Context, inject, controller, get, provide } from 'midway'
import { IRepositoryInfoService } from '../../interface/repositoryInfo'
import { ITrackedRepositoriesService } from '../../interface/trackRepositories'

@provide()
@controller('/v1/trackedRepositories')
export class TrackRepositoriesController {

  @inject()
  ctx: Context

  @inject('repositoryInfoService')
  riService: IRepositoryInfoService

  @inject('trackRepositoriesService')
  trService: ITrackedRepositoriesService

  @get('/list')
  async getTrackedRepositories(): Promise<void> {
    const result = await this.trService.scanAllRepositories()
    this.ctx.success(result)
  }
}
