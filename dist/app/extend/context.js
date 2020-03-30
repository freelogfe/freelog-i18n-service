"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const _ = require("lodash");
const extend = require("extend");
const is = require("is-type-of");
const ret_code_1 = require("../enum/ret-code");
const error_code_1 = require("../enum/error-code");
const ctx = {
    success(data) {
        this.body = this.toBody(ret_code_1.default.success, error_code_1.default.success, 'success', data);
    },
    /* 构建API返回数据格式 */
    toBody(ret, errcode, msg, data) {
        const result = {
            ret: is.int32(ret) ? ret : ret_code_1.default.success,
            errcode: is.int32(errcode) ? errcode : error_code_1.default.success,
            msg: (is.string(msg) || is.number(msg)) ? msg.toString() : 'success',
            data: is.nullOrUndefined(data) ? null : data,
        };
        return result;
    },
    // /* 定义错误返回的API数据结构 */
    error(params) {
        const { msg, errcode, ret: retcode, data } = params;
        const message = msg || 'proxy内部异常';
        throw Object.assign(new Error(message), {
            retcode: retcode ? retcode : ret_code_1.default.success,
            errcode: errcode ? errcode : error_code_1.default.apiError,
            data: !is.undefined(data) ? data : is.error(arguments[0]) ? arguments[0].data : undefined,
        });
    },
    /* 获取内部REST-API数据 */
    async curlRequest(url, options) {
        const { app } = this;
        const req = this.request;
        url = url[0] === '/' ? (app.config.apiProxy.target + url) : url;
        options = options || {};
        options = extend(true, {
            method: req.method,
            headers: this.headers,
            dataType: 'json',
            timeout: 1e4,
        }, options);
        if (!options.data && !_.isEmpty(req.body)) {
            options.data = req.body;
        }
        const result = await this.curl(url, options);
        return result;
    },
};
exports.default = ctx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZXh0ZW5kL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDRCQUE0QjtBQUM1QixpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLCtDQUEwQztBQUMxQyxtREFBNEM7QUFZNUMsTUFBTSxHQUFHLEdBQUc7SUFDVixPQUFPLENBQUMsSUFBUztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBVyxDQUFDLE9BQU8sRUFBRSxvQkFBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUNELGlCQUFpQjtJQUNqQixNQUFNLENBQUMsR0FBVyxFQUFFLE9BQWUsRUFBRSxHQUFvQixFQUFFLElBQVM7UUFDbEUsTUFBTSxNQUFNLEdBQUc7WUFDYixHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBVyxDQUFDLE9BQU87WUFDOUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0JBQVcsQ0FBQyxPQUFPO1lBQzFELEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDcEUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUM3QyxDQUFBO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBQ0QsdUJBQXVCO0lBQ3ZCLEtBQUssQ0FBQyxNQUFXO1FBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDbkQsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQTtRQUNsQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBVyxDQUFDLE9BQU87WUFDaEQsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxvQkFBVyxDQUFDLFFBQVE7WUFDakQsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQzFGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0I7SUFDcEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsT0FBMEI7UUFDdkQsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNwQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBRXhCLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1FBQy9ELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBRXZCLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3JCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLEdBQUc7U0FDYixFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRVgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7U0FDeEI7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQztDQUVjLENBQUE7QUFFakIsa0JBQWUsR0FBRyxDQUFBIn0=