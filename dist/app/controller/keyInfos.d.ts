import { Context } from 'midway';
export default class NodeReport {
    ctx: Context;
    dal: any;
    getKeyInfo(): Promise<void>;
    createKeyInfo(): Promise<void>;
    updateKeyInfo(): Promise<void>;
    deleteKeyInfo(): Promise<void>;
    list(): Promise<void>;
    allKeyInfos(): Promise<void>;
    updateTags(): Promise<void>;
    createOrUpdateTags(): Promise<void>;
}
