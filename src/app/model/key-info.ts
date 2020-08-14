import { Application } from 'midway'
export default (app: Application) => {
  const mongoose = app.mongoose
  const I18nKeyInfoSchema = new mongoose.Schema({
    name: { type: String },
    moduleName: { type: String },
    repositoryName: { type: String },
    description: { type: String },
    updateTime: { type: Date, default: Date.now },
    tags: { type: Array },
    values: { type: Array },
  })

  I18nKeyInfoSchema.index({ updateTime: -1 })
  return mongoose.model('keyInfo', I18nKeyInfoSchema)
}
