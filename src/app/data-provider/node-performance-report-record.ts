import MongoBaseOperation = require('egg-freelog-database/lib/database/mongo-base-operation')
import { provide, Application } from 'midway'

@provide()
export default class WebReportRecordProvider extends MongoBaseOperation {
  constructor(app: Application) {
    super(app.model.NodePerformanceReportRecord)
  }
}
