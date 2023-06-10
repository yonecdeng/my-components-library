# 封装 axios

注意 ⚠️：项目的全局位置添加了 shims.d.ts 文件用于扩展 axios 里的 request config 类型

`utils/request/request-creator/index`用于创建 request 方法和 axios 实例

拦截器都放到了`utils/request/request-creator/interceptor`里

项目中具体使用看 `utils/request/demo`下的 demo：
一般就是先利用 request-creator 创建一个实例，并且在实例中注册各种拦截器（一般拦截之后返回到项目中的是 response.data）。然后再用 request 方法去写项目里的各种 api。（request 方法内部其实就是调用 instance.request 方法）
