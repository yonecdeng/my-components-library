import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';
export interface ResponseData {
  result: number;
  data?: Record<string, any> | Array<any>;
  message?: string;
}

export interface Interceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 响应拦截
  responseInterceptors?: (
    res: AxiosResponse<ResponseData>
  ) => AxiosResponse<ResponseData>;
}

//根据基础通用config生成整个项目中基础的Requset，再根据基础的Request去编写业务请求函数
function RequestCreator(config: AxiosRequestConfig) {
  const axiosInstance = axios.create(config);

  const request = (config: AxiosRequestConfig) => {
    //返回一个函数出去，这个函数里面用的是instance的request根据config进行请求
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置了拦截器，则使用这个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config); //请求拦截器的作用是处理发动请求的配置，所以参数是config
      }
      axiosInstance
        .request(config)
        .then((res) => {
          // 如果我们为单个响应设置了拦截器，则这里使用这个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res); //响应拦截器的作用是处理返回的结果，所以参数是res
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return {
    axiosInstance, //实例暴露出去用于注册拦截器
    request //用这个方法进行请求
  };
}
// 拦截器执行顺序: 接口本身拦截器请求 -> 实例拦截器请求  -> 实例拦截器响应 -> 接口本身拦截器响应
export default RequestCreator;
