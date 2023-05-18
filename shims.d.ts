/**拓展axios里request config的类型 */
import 'axios'; // 导入原始 Axios 类型
declare module 'axios' {
  export interface AxiosRequestConfig {
    retryDelay?: number; //单位为毫秒表示过多少毫秒后进行重传
    retryLimit?: number; //最大重试次数
    __retryCount?: number; //重试次数
    isGlobalLoading?: boolean;
    interceptors?: Interceptors;
  }
}
