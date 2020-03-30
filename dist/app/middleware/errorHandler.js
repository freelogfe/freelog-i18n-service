"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const is = require("is-type-of");
const ret_code_1 = require("../enum/ret-code");
const error_code_1 = require("../enum/error-code");
exports.default = () => {
    return async (ctx, next) => {
        try {
            // bodyParserError为上层egg默认首个中间件bodyParser的异常
            if (ctx.request.bodyParserError) {
                throw Object.assign(ctx.request.bodyParserError, {
                    retcode: ret_code_1.default.success,
                    errcode: error_code_1.default.paramValidateError,
                    data: 'bodyParse数据转换异常,请检查传入的数据是否符合接口规范',
                });
            }
            ctx.errors = [];
            await next();
            if (ctx.body === undefined && /^[2|3]{1}\d{2}$/.test(ctx.response.status)) {
                ctx.body = ctx.toBody(ret_code_1.default.success, error_code_1.default.success, 'success', null);
            }
        }
        catch (e) {
            if (is.nullOrUndefined(e)) {
                e = new Error('not defined error'); // eslint-disable-line
            }
            if (!is.int(e.retcode)) {
                e.retcode = ret_code_1.default.serverError;
            }
            if (!is.int(e.erreode)) {
                e.erreode = error_code_1.default.autoSnapError;
            }
            ctx.body = ctx.toBody(e.retcode, e.erreode, e.message || e.toString(), e.data);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2Vycm9ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0MsaUNBQWlDO0FBRWpDLCtDQUEwQztBQUMxQyxtREFBNEM7QUFFNUMsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU8sS0FBSyxFQUFFLEdBQVEsRUFBRSxJQUFvQixFQUFFLEVBQUU7UUFDOUMsSUFBSTtZQUNGLDRDQUE0QztZQUM1QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUMvQixNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUU7b0JBQy9DLE9BQU8sRUFBRSxrQkFBVyxDQUFDLE9BQU87b0JBQzVCLE9BQU8sRUFBRSxvQkFBVyxDQUFDLGtCQUFrQjtvQkFDdkMsSUFBSSxFQUFFLGtDQUFrQztpQkFDekMsQ0FBQyxDQUFBO2FBQ0g7WUFDRCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNmLE1BQU0sSUFBSSxFQUFFLENBQUE7WUFDWixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6RSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQVcsQ0FBQyxPQUFPLEVBQUUsb0JBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ2pGO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekIsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUEsQ0FBQyxzQkFBc0I7YUFDMUQ7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RCLENBQUMsQ0FBQyxPQUFPLEdBQUcsa0JBQVcsQ0FBQyxXQUFXLENBQUE7YUFDcEM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RCLENBQUMsQ0FBQyxPQUFPLEdBQUcsb0JBQVcsQ0FBQyxhQUFhLENBQUE7YUFDdEM7WUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMvRTtJQUNILENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9