import { provide, inject, controller, Context, post, get, put, del, plugin } from 'midway'
import { PlainObject } from '../../interface'

@provide()
@controller('/v1/i18nKeyInfos')
export default class NodeReport {

  @inject()
  ctx: Context

  @plugin()
  dal: any

  @get('/')
  async getKeyInfo() {
    const condition: PlainObject = this.ctx.query
    const res = await this.dal.keyInfo.findOne(condition)
    this.ctx.success(res)
  }

  @post('/')
  async createKeyInfo() {
    const body: PlainObject = this.ctx.request.body
    const res = await this.dal.keyInfo.create(body)
    this.ctx.success(res)
  }

  @put('/')
  async updateKeyInfo() {
    const body: PlainObject = this.ctx.request.body
    const { name, moduleName, repositoryName, description, tags = [], values = [] } = body
    const condition = { name, moduleName, repositoryName }
    const res = await this.dal.keyInfo.findOneAndUpdate(condition, { description, tags, values }, { new: true })
    this.ctx.success(res)
  }

  @del('/')
  async deleteKeyInfo() {
    const condition: PlainObject = this.ctx.request.body
    const res = await this.dal.keyInfo.deleteOne(condition)
    this.ctx.success(res)
  }

  @get('/list')
  async list() {
    const condition: PlainObject = this.ctx.query
    // const projection: string [] = []
    const res = await this.dal.keyInfo.find(condition)
    this.ctx.success(res)
  }

}
