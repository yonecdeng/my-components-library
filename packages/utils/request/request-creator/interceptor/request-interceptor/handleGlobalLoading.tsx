import { AxiosRequestConfig } from 'axios';

function handleGlobalLoading(config: AxiosRequestConfig) {
  if (config.isGlobalLoading) {
    //todo:展示全局loading
  }
}
export default handleGlobalLoading;
