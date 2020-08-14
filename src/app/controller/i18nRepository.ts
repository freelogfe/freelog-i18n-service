import { provide, controller, inject, Context, get, put, post, del } from 'midway'
import { II18nRepositorySerive } from '../../interface/i18nRepository'
import { IKeysInfoService } from '../../interface/keysInfo'

@provide()
@controller('/v1/i18nRepository')
export class I18nDataController {

  @inject()
  ctx: Context

  @inject('i18nRepositorySerive')
  irSerive: II18nRepositorySerive

  @inject('keysInfoService')
  kInfoService: IKeysInfoService

  @get('/allData')
  async getAllI18nFileData(): Promise<void> {
    const result = await this.irSerive.getAllI18nData()
    this.ctx.success(result)
  }

  @get('/data')
  async getI18nFileDataByPath(): Promise<void> {
    const result = await this.irSerive.getI18nDataByPath()
    this.ctx.success(result)
  }

  @put('/data')
  async updateI18nFileData(): Promise<void> {
    const result = await this.irSerive.updateI18nData()
    this.ctx.success(result)
  }

  @post('/newModule')
  async creaetNewModule(): Promise<void> {
    const result = await this.irSerive.creaetNewModule()
    this.ctx.success(result)
  }

  @del('/module')
  async deleteModule(): Promise<void> {
    const result = await this.irSerive.deleteModule()
    this.ctx.success(result)
  }

  @get('/data/download')
  async downloadFile(): Promise<void> {
    const result = await this.irSerive.downloadI18nFile()
    this.ctx.success(result)
  }

  @get('/check')
  async checkRepository(): Promise<void> {
    const result = await this.irSerive.checkRepository()
    this.ctx.success(result)
  }

  // @get('/keysInfo')
  // async getRepositoryKeysInfo(): Promise<void> {
  //   const { repositoryName } = this.ctx.query
  //   const result = await this.kInfoService.readKeysInfoFile(repositoryName)
  //   this.ctx.success(result)
  // }

  // @put('/keyInfo')
  // async updateRepositoryKeyInfo(): Promise<void> {
  //   const { repositoryName, moduleName, key, keyInfo } = this.ctx.request.body
  //   await this.kInfoService.updateKeyInfo(repositoryName, moduleName, key, keyInfo)
  //   this.ctx.success(null)
  // }

  @post('/changes/push')
  async commitAndPushChanges() {
    const result = await this.irSerive.commitAndPushChanges()
    this.ctx.success(result)
  }
}
