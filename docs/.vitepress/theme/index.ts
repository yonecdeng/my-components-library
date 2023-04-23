import DefaultTheme from 'vitepress/theme';

/**Vitepress 中含有 vue 实例，也就是说 vue 的代码也是可以直接运行的。通过编写一个主题 theme 就可以获取 vue 实例。只需要在 enhanceApp 方法中注册组件库插件就可以了。 */
export default {
  ...DefaultTheme
};
