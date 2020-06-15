"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const mongoose = app.mongoose;
    const resourcePerformanceRecord = new mongoose.Schema({
        url: { type: String },
        initiatorType: { type: String },
        duration: { type: Number },
        startTime: { type: Number },
        decodedBodySize: { type: Number },
        nextHopProtocol: { type: String }
    }, { _id: false });
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
        resourceTimingList: { type: [resourcePerformanceRecord] }
    });
    NodeReportRecordSchema.index({ time: -1 });
    return mongoose.model('node-report-record', NodeReportRecordSchema);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wZXJmb3JtYW5jZS1yZXBvcnQtcmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9tb2RlbC9ub2RlLXBlcmZvcm1hbmNlLXJlcG9ydC1yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrQkFBZSxDQUFDLEdBQWdCLEVBQUUsRUFBRTtJQUNsQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO0lBRTdCLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3BELEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDckIsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUMvQixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQzFCLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDM0IsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNqQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0tBQ2xDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUVsQixNQUFNLHNCQUFzQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNqRCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3RCLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDckIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUN6QixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ3pCLFdBQVcsRUFBRTtZQUNYLFFBQVE7WUFDUixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3JCLFVBQVU7WUFDVixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLFVBQVU7WUFDVixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLFVBQVU7WUFDVixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLGtCQUFrQjtZQUNsQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3ZCLCtCQUErQjtZQUMvQixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3JCLGdDQUFnQztZQUNoQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLGdDQUFnQztZQUNoQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3RCLG1CQUFtQjtZQUNuQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1NBQ3hCO1FBQ0Qsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBRSx5QkFBeUIsQ0FBRSxFQUFFO0tBQzVELENBQUMsQ0FBQTtJQUVGLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixDQUFDLENBQUE7QUFDckUsQ0FBQyxDQUFBIn0=