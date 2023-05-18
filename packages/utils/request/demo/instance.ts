/**项目中使用request去写每个api */
import useCancelRequest from '../request-creator/interceptor/request-interceptor/useCancelRequest';
import { useErrorHandler } from '../request-creator/interceptor/response-interceptor/useErrorHandler';
import handleGlobalLoading from '../request-creator/interceptor/request-interceptor/handleGlobalLoading';
import RequestCreator from '../request-creator';
import router from '../../../../play/src/router';
const { axiosInstance, request } = RequestCreator({
  baseURL: '/',
  timeout: 10000,
  validateStatus: (status) => {
    return status === 200 || status === 304;
  }
});
/**注册全局请求拦截器 */
const { addPending } = useCancelRequest();
axiosInstance.interceptors.request.use((config) => {
  addPending(config); //避免重复请求
  handleGlobalLoading(config); //是否展示全局loading
  return config;
});

/**注册全局响应拦截器 */
const { networkErrorHandler, requestApisErrorHandler, safeguardingHandler } =
  useErrorHandler({
    safeguardingList: ['/posts/get'],
    errorRoute: '/error',
    needPopupList: [],
    noLoginCode: 10001,
    safeguardingErrorCodes: [1111],
    router
  });
axiosInstance.interceptors.response.use(
  (response) => {
    if (response === undefined) {
      return response;
    }
    if (response.data.result === 1) {
      return response.data;
    } else {
      safeguardingHandler(response);
      requestApisErrorHandler(response);
    }
  },
  (err) => {
    networkErrorHandler(err.config?.url);
  }
);

export default request; //项目中使用request去写每个api
