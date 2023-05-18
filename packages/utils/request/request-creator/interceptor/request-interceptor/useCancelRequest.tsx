import { isFunction } from '../../../../is';
import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import qs from 'qs';

function useCancelRequest() {
  // * 声明一个 Map 用于存储每个请求的标识 和 取消函数
  let pendingMap = new Map<string, Canceler>();

  // * 序列化参数 作为每个请求的标识
  const getPendingUrl = (config: AxiosRequestConfig) =>
    [
      config.method,
      config.url,
      qs.stringify(config.data),
      qs.stringify(config.params)
    ].join('&');

  /**
   * @description: 添加请求
   * @param {Object} config
   * @return void
   */
  function addPending(config: AxiosRequestConfig) {
    // * 在请求开始前，对之前的请求做检查取消操作
    removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 移除请求
   * @param {Object} config
   */
  function removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);
    }
  }

  /**
   * @description: 清空所有pending
   */
  function removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * @description: 重置
   */
  function reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
  return {
    getPendingUrl,
    addPending,
    removePending,
    removeAllPending,
    reset
  };
}
export default useCancelRequest;
