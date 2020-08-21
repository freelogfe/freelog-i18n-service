import { provide, inject, controller, Context, post, get, put, del, plugin } from 'midway'
import { PlainObject } from '../../interface'
import { isEmpty } from '../shared/utils'

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
    const { name, moduleName, repositoryName, description, tags } = body
    const condition = { name, moduleName, repositoryName }
    const update: PlainObject = {}
    if (description != null) {
      update['description'] = description
    }
    if (tags != null) {
      update['tags'] = tags
    }
    console.log('[update]:', update)
    const res = await this.dal.keyInfo.findOneAndUpdate(condition, update, { new: true })
    if (res != null) {
      this.ctx.success(res)
    } else {
      this.ctx.error({ data: null, msg: '标签更新操作失败！' })
    }
  }

  @del('/')
  async deleteKeyInfo() {
    const condition: PlainObject = this.ctx.request.body
    const res = await this.dal.keyInfo.deleteOne(condition)
    this.ctx.success(res)
  }

  @get('/list')
  async list() {
    const queryOpts: PlainObject = this.ctx.query
    const { tags, keys } = queryOpts
    if (isEmpty(tags) && isEmpty(keys)) {
      this.ctx.error({ data: null, msg: '缺少参数tags或keys！' })
      return
    }
    const condition: any = {}
    if (!isEmpty(tags)) {
      condition['tags'] = { $in: tags.split(',') }
    }
    if (!isEmpty(keys)) {
      condition['name'] = { $in: keys.split(',') }
    }
    const res = await this.dal.keyInfo.find(condition)
    this.ctx.success(res)
  }

  @get('/all')
  async allKeyInfos() {
    const res = await this.dal.keyInfo.find({})
    this.ctx.success(res)
  }

  @put('/tags')
  async updateTags() {
    const body: PlainObject = this.ctx.request.body
    const { repositoryName, selectedTag, newTag } = body
    const res = await this.dal.keyInfo.updateMany({ tags: selectedTag, repositoryName }, { $set: { 'tags.$': newTag } }, { new: true })
    if (res.ok === 1 && res.nModified > 0) {
      const result = await this.dal.keyInfo.find({ tags: newTag, repositoryName })
      this.ctx.success(result)
    } else {
      this.ctx.error({ data: null, msg: '标签更新失败！' })
    }
  }

  @post('/tags')
  async createOrUpdateTags() {
    const { newTag, repositoryName, checkedKeyList } = this.ctx.request.body
    const nameArr = checkedKeyList.map((item: PlainObject) => item.name)
    const existedKeyInfos = await this.dal.keyInfo.find({ name: { $in: nameArr }, repositoryName })
    const existedKeys: string [] = existedKeyInfos.map((keyInfo: PlainObject) => keyInfo.name)
    const newKeyInfos = checkedKeyList.filter((keyInfo: PlainObject) => {
      if (existedKeys.indexOf(keyInfo.name) === -1) {
        keyInfo.tags = [ newTag ]
        return true
      }
      return false
    })
    const operations = [
      ...newKeyInfos.map((keyInfo: PlainObject) => {
        return {
          insertOne: {
            document: keyInfo
          }
        }
      }),
      ...existedKeyInfos.map((keyInfo: PlainObject) => {
        return {
          updateOne: {
            filter: { _id: keyInfo._id },
            update: { $addToSet: { tags: newTag } }
          }
        }
      })
    ]
    const result = await this.dal.keyInfo.model.bulkWrite(operations)
    this.ctx.success(result)
  }
}
