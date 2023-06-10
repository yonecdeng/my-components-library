# 组件库

## 设计思路

### 关于打包和使用

#### 介绍

目前组件库没有打包，因为团队内的就没有打包，直接路径引用；没有搞单元测试，因为感觉搞有点麻烦，我直接把组件放进去就行了。用我那个组件库项目收集 kwai 的项目的通用封装（如果市面上有的就算了）。

#### 在文档中使用

配置别名：
`vite.config.ts`

```ts
export default defineConfig({
  resolve: {
    alias: {
      '@components-library': `${path.resolve(
        __dirname,
        '../packages/components/src'
      )}`
    }
  }
});
```

具体的文档中：

```ts
<script setup>
import Loader from '@components-library/data-show/list/reach-bottom-loader';
</script>
<Loader/>
```

### 代码结构设计

index.ts 导出整个组件及其类型
目录同名 vue 文件为主组件入口
目录同名 ts 文件为组件的 props、emits、slots
