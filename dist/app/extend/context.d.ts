/// <reference path="../../../src/globals.d.ts" />
import { Context } from 'midway';
import { CurlRequestOption } from '../../interface/index';
export interface IExtendedCtx extends Context {
    success(data: any): void;
    toBody(ret: number, errcode: number, msg: string | number, data: any): any;
    error(params: any): void;
    curlRequest(url: string, options?: CurlRequestOption): Promise<any>;
}
declare const ctx: IExtendedCtx;
export default ctx;
