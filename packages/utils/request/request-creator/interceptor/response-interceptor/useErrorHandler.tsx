import type { ResponseData } from '../..';
import { type Router } from 'vue-router';
import request from '../../../demo/instance';
import { AxiosResponse } from 'axios';

interface ErrorHandlerConfig {
  safeguardingList: string[]; //需要做兜底页的链接集合
  safeguardingErrorCodes: number[]; //兜底页错误状态码集合
  noLoginCode: number; //未登录状态码
  errorRoute: string; // 显示错误的路由名字
  needPopupList: string[]; //需要弹窗提示的链接集合
  router: Router;
}
export const useErrorHandler = (config: ErrorHandlerConfig) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger

  /**
   * @param url 是目前请求的地址
   */
  const networkErrorHandler = (res: AxiosResponse<ResponseData>) => {
    const errorHandler = () => {
      if (config.safeguardingList.includes(requestConfig.url!)) {
        config.router.replace({
          name: config.errorRoute,
          query: {
            code: '500',
            msg: '网络似乎断开了，请再试一试',
            backUrl: config.router.currentRoute.value.fullPath
          }
        });
      } else {
        //todo: 弹窗提示网络断开
      }
    };

    /**处理重传 */
    const requestConfig = res.config;
    if (!requestConfig || !requestConfig.retryLimit) {
      return errorHandler();
    }
    const { __retryCount = 0, retryDelay = 300, retryLimit } = requestConfig; //用户在请求的时候配置retryDelay 和 retryTimes

    // 判断是否超过了重试次数
    if (__retryCount >= retryLimit) {
      return errorHandler(); //重传了规定的次数后还是不行那就返回错误
    }
    // 在请求对象上设置这是重试的第几次
    requestConfig.__retryCount = __retryCount + 1;
    // 延时处理
    const delay = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, retryDelay);
    });
    // 重新发起请求
    return delay.then(function () {
      return request(requestConfig);
    });
  };

  // status 200 && reuslt !== 1 cause this function to trigger
  /**
   * @param errorResp 是response里的data
   * @param url 是目前请求的地址
   */
  const safeguardingHandler = (res: AxiosResponse<ResponseData>) => {
    const errorResp = res.data;
    const url = res.config.url;
    if (!url) return errorResp;
    // 不用处理的链接 就直接跳过了
    if (!config?.safeguardingList.includes(url)) {
      return errorResp;
    }
    // 没有返回说明是网络出现错误
    if (errorResp == null) {
      networkErrorHandler(res);
      return;
    }
    // 未登录
    if (errorResp.result === config?.noLoginCode) {
      return;
    }
    // 兜底页拦截行为
    if (config?.safeguardingErrorCodes.includes(errorResp.result)) {
      config.router.replace({
        name: config.errorRoute,
        query: {
          code: String(errorResp.result),
          msg: errorResp.message ?? '网络繁忙，请稍后重试',
          backUrl: config.router.currentRoute.value.fullPath
        }
      });
    }
  };

  //需要弹窗提示的接口错误则弹窗，不需要的直接忽略即可
  /**
   * @param errorResp 是response里的data
   * @param url 是目前请求的地址
   */
  const requestApisErrorHandler = (res: AxiosResponse<ResponseData>) => {
    const errorResp = res.data;
    const url = res.config.url;
    if (!url) return errorResp;

    // 没有返回说明是网络出现错误
    if (errorResp == null) {
      networkErrorHandler(res);
      return;
    }
    // 未登录
    if (errorResp.result === config?.noLoginCode) {
      return;
    }
    if (config?.needPopupList.includes(url)) {
      //todo：弹出弹窗提示请求接口出错
    } else {
      return errorResp;
    }
  };

  return {
    networkErrorHandler,
    safeguardingHandler,
    requestApisErrorHandler
  };
};
