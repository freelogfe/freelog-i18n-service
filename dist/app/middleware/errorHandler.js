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
            let retcode = ret_code_1.default.serverError;
            let erreode = error_code_1.default.autoSnapError;
            let errMsg = 'not defined error';
            if (is.error(e)) {
                errMsg = e.stack;
            }
            else {
                if (is.int(e.retcode)) {
                    retcode = e.retcode;
                }
                if (is.int(e.erreode)) {
                    erreode = e.erreode;
                }
                if (is.string(e.message)) {
                    errMsg = e.message;
                }
            }
            ctx.body = ctx.toBody(retcode, erreode, errMsg, null);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2Vycm9ySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0MsaUNBQWlDO0FBRWpDLCtDQUEwQztBQUMxQyxtREFBNEM7QUFDNUMsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU8sS0FBSyxFQUFFLEdBQVEsRUFBRSxJQUFvQixFQUFFLEVBQUU7UUFDOUMsSUFBSTtZQUNGLDRDQUE0QztZQUM1QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUMvQixNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUU7b0JBQy9DLE9BQU8sRUFBRSxrQkFBVyxDQUFDLE9BQU87b0JBQzVCLE9BQU8sRUFBRSxvQkFBVyxDQUFDLGtCQUFrQjtvQkFDdkMsSUFBSSxFQUFFLGtDQUFrQztpQkFDekMsQ0FBQyxDQUFBO2FBQ0g7WUFDRCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNmLE1BQU0sSUFBSSxFQUFFLENBQUE7WUFDWixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6RSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQVcsQ0FBQyxPQUFPLEVBQUUsb0JBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ2pGO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksT0FBTyxHQUFHLGtCQUFXLENBQUMsV0FBVyxDQUFBO1lBQ3JDLElBQUksT0FBTyxHQUFHLG9CQUFXLENBQUMsYUFBYSxDQUFBO1lBQ3ZDLElBQUksTUFBTSxHQUFHLG1CQUFtQixDQUFBO1lBQ2hDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZixNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQTthQUNqQjtpQkFBTTtnQkFDTCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNyQixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtpQkFDcEI7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDckIsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7aUJBQ3BCO2dCQUNELElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3hCLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO2lCQUNuQjthQUNGO1lBQ0QsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3REO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=