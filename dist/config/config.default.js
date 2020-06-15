"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1585202352797_7394';
    config.middleware = ['errorHandler'];
    // add your config here
    config.bodyParser = {
        enableTypes: ['json', 'form', 'text']
    };
    config.nodegit = {
        user: {
            token: '3c9653aec77ac77203670043bb34b554cffaf1e4',
            name: 'Wweizhi',
            email: '790727372@qq.com',
            password: 'Wwz_3110641',
        },
        i18nRepositoriesDirPath: 'i18n-repositories/',
        i18nRemote: 'origin',
        trackedRepositories: {
            'freelogfe-web-repos': {
                reposI18nPath: 'packages/@freelog/freelog-i18n/',
                reposUrl: 'https://github.com/freelogfe/freelogfe-web-repos.git',
                reposI18nBranch: 'i18n-test'
            },
            'freelog-node-provider': {
                reposI18nPath: 'config/i18n-text/',
                reposUrl: 'https://github.com/freelogfe/freelog-node-provider.git',
                reposI18nBranch: 'i18n-test'
            },
        },
    };
    config.cors = {
        credentials: true,
        origin(ctx) {
            return ctx.request.headers.origin || '*';
        },
        exposeHeaders: 'freelog-resource-type,freelog-meta,freelog-system-meta,freelog-sub-dependencies,freelog-entity-nid',
    };
    config.security = {
        domainWhiteList: ['.testfreelog.com'],
        csrf: {
            enable: false,
            ignoreJSON: true,
            cookieName: 'csrfToken',
            refererWhiteList: ['http://local.testfreelog.com/'],
        }
    };
    config.mongoose = {
        url: 'mongodb://39.108.77.211:30772/nodeReportRecord'
    };
    /**
     * 内部中间件没有处理到的异常,在此处统一处理
     */
    config.onerror = {
        all(err, ctx) {
            ctx.body = {
                ret: 0,
                errCode: 1,
                msg: '未处理的异常',
                data: err.stack || err.toString(),
            };
        },
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQTtJQUVsQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFBO0lBRWxELE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBRSxjQUFjLENBQUUsQ0FBQTtJQUN0Qyx1QkFBdUI7SUFFdkIsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNsQixXQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztLQUN0QyxDQUFBO0lBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0QsdUJBQXVCLEVBQUUsb0JBQW9CO1FBQzdDLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLG1CQUFtQixFQUFFO1lBQ25CLHFCQUFxQixFQUFFO2dCQUNyQixhQUFhLEVBQUUsaUNBQWlDO2dCQUNoRCxRQUFRLEVBQUUsc0RBQXNEO2dCQUNoRSxlQUFlLEVBQUUsV0FBVzthQUM3QjtZQUNELHVCQUF1QixFQUFFO2dCQUN2QixhQUFhLEVBQUUsbUJBQW1CO2dCQUNsQyxRQUFRLEVBQUUsd0RBQXdEO2dCQUNsRSxlQUFlLEVBQUUsV0FBVzthQUM3QjtTQUNGO0tBQ0YsQ0FBQTtJQUVELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixXQUFXLEVBQUUsSUFBSTtRQUNqQixNQUFNLENBQUMsR0FBWTtZQUNqQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUE7UUFDMUMsQ0FBQztRQUNELGFBQWEsRUFBRSxvR0FBb0c7S0FDcEgsQ0FBQTtJQUVELE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsZUFBZSxFQUFFLENBQUUsa0JBQWtCLENBQUU7UUFDdkMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsV0FBVztZQUN2QixnQkFBZ0IsRUFBRSxDQUFFLCtCQUErQixDQUFFO1NBQ3REO0tBQ0YsQ0FBQTtJQUVELE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsR0FBRyxFQUFFLGdEQUFnRDtLQUN0RCxDQUFBO0lBQ0Q7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2YsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFZO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUM7Z0JBQ1YsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTthQUNsQyxDQUFBO1FBQ0gsQ0FBQztLQUNGLENBQUE7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9