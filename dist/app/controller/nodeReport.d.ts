import { Context } from 'midway';
export default class NodeReport {
    ctx: Context;
    dal: any;
    createRecord(): Promise<void>;
    list(): Promise<void>;
}
