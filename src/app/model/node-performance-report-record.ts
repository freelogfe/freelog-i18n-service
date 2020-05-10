import { Application } from 'midway'
export default (app: Application) => {
  const mongoose = app.mongoose

  const resourcePerformanceRecord = new mongoose.Schema({
    url: { type: String },
    type: { type: String },
    duration: { type: String },
    decodedBodySize: { type: Number },
    nextHopProtocol: { type: String }
  }, { _id: false })

  const NodeReportRecordSchema = new mongoose.Schema({
    isFristIn: { type: Boolean },
    screenwidth: { type: Number },
    screenheight: { type: Number },
    type: { type: Number },
    time: { type: Number },
    url: { type: String },
    prevUrl: { type: String },
    performance: {
      dnst: { type: Number },
      tcpt: { type: Number },
      wit: { type: Number },
      domt: { type: Number },
      lodt: { type: Number },
      radt: { type: Number },
      rdit: { type: Number },
      uodt: { type: Number },
      reqt: { type: Number },
      andt: { type: Number },
    },
    resourceList: { type: [ resourcePerformanceRecord ] }
  })

  NodeReportRecordSchema.index({ time: -1 })
  return mongoose.model('node-report-record', NodeReportRecordSchema)
}
