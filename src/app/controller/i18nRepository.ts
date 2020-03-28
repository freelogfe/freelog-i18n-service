import { provide, controller, inject, Context, get, put, post, del } from 'midway'
import { II18nRepositorySerive } from '../../interface/i18nRepository'

@provide()
@controller('/v1/i18nRepository')
export class I18nDataController {

  @inject()
  ctx: Context

  @inject('i18nRepositorySerive')
  irSerive: II18nRepositorySerive

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

  }

  @post('/module/create')
  async creaetNewModule(): Promise<void> {

  }

  @del('/module/delete')
  async deleteModule(): Promise<void> {
  }

  @get('/data/download')
  async downloadFile(): Promise<void> {
  }

  async checkRepository(): Promise<void> {
  }

  @get('/keysInfo')
  async getRepositoryInfo(): Promise<void> {
  }

  @put('/keyInfo')
  async updateKeyInfo(): Promise<void> {
  }
}
