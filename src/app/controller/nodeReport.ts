import { provide, inject, controller, Context, post, get, plugin } from 'midway'
import { PlainObject } from '../../interface'

@provide()
@controller('/v1/nodeReport')
export default class NodeReport {

  @inject()
  ctx: Context

  @plugin()
  dal: any

  @post('/')
  async createRecord() {
    const body: PlainObject = this.ctx.request.body
    const res = await this.dal.nodePerformanceReportRecord.create(body)
    this.ctx.success(res)
  }

  @get('/list')
  async list() {
    const condition = {}
    const projection: string [] = []
    const res = await this.dal.nodePerformanceReportRecord.findPageList(condition, 1, 50, projection.join(' '))
    this.ctx.success(res)
  }
}
