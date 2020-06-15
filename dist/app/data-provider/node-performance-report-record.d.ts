import MongoBaseOperation = require('egg-freelog-database/lib/database/mongo-base-operation');
import { Application } from 'midway';
export default class WebReportRecordProvider extends MongoBaseOperation {
    constructor(app: Application);
}
