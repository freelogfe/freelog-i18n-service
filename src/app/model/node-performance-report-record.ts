import { Application } from 'midway'
export default (app: Application) => {
  const mongoose = app.mongoose

  const resourcePerformanceRecord = new mongoose.Schema({
    url: { type: String },
    initiatorType: { type: String },
    duration: { type: Number },
    startTime: { type: Number },
    decodedBodySize: { type: Number },
    nextHopProtocol: { type: String }
  }, { _id: false })

  const NodeReportRecordSchema = new mongoose.Schema({
    time: { type: Number },
    url: { type: String },
    clientW: { type: Number },
    clientH: { type: Number },
    performance: {
      // 重定向耗时
      rdt: { type: Number },
      // DNS查询耗时
      dnst: { type: Number },
      // TCP连接耗时
      tcpt: { type: Number },
      // Doc请求耗时
      doct: { type: Number },
      // Firstbyte首包加载耗时
      ttfbt: { type: Number },
      // FP: First paint, 首次渲染 或 白屏耗时
      fpt: { type: Number },
      // TTI：Time to Interact，首次可交互 耗时
      ttit: { type: Number },
      // Ready：HTML 加载完成时间，即 DOM 就位的时间
      rdyt: { type: Number },
      // loaded: 页面完全加载耗时
      loadt: { type: Number },
    },
    resourceTimingList: { type: [ resourcePerformanceRecord ] }
  })

  NodeReportRecordSchema.index({ time: -1 })
  return mongoose.model('node-report-record', NodeReportRecordSchema)
}
