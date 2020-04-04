"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1585202352797_7394';
    config.middleware = ['errorHandler'];
    // add your config here
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
                reposUrl: 'https://github.com/freelogfe/freelogfe-web-repos',
                reposI18nBranch: 'i18n-test'
            },
            'freelog-node-provider': {
                reposI18nPath: 'config/i18n-text/',
                reposUrl: 'https://github.com/freelogfe/freelog-node-provider',
                reposI18nBranch: 'i18n-test'
            },
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQTtJQUVsQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFBO0lBRWxELE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBRSxjQUFjLENBQUUsQ0FBQTtJQUN0Qyx1QkFBdUI7SUFFdkIsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0QsdUJBQXVCLEVBQUUsb0JBQW9CO1FBQzdDLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLG1CQUFtQixFQUFFO1lBQ25CLHFCQUFxQixFQUFFO2dCQUNyQixhQUFhLEVBQUUsaUNBQWlDO2dCQUNoRCxRQUFRLEVBQUUsa0RBQWtEO2dCQUM1RCxlQUFlLEVBQUUsV0FBVzthQUM3QjtZQUNELHVCQUF1QixFQUFFO2dCQUN2QixhQUFhLEVBQUUsbUJBQW1CO2dCQUNsQyxRQUFRLEVBQUUsb0RBQW9EO2dCQUM5RCxlQUFlLEVBQUUsV0FBVzthQUM3QjtTQUNGO0tBQ0YsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLEdBQUcsQ0FBQyxHQUFRLEVBQUUsR0FBWTtZQUN4QixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULEdBQUcsRUFBRSxDQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDO2dCQUNWLEdBQUcsRUFBRSxRQUFRO2dCQUNiLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7YUFDbEMsQ0FBQTtRQUNILENBQUM7S0FDRixDQUFBO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==