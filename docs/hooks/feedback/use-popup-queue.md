# usePopupQueue

后端下发了一堆弹窗或者前端同时触发了多个弹窗，通过弹窗队列的方式去管理 保证全局或者某个组件内一次性只会弹出一个弹窗

## 示例

<script setup>
import SinglePopupIndex from '@hooks/feedback/usePopupQueue/demo/SinglePopupIndex.vue';
</script>
<div>
<SinglePopupIndex/>
</div>

<details>
<summary>展开查看代码</summary>

```vue
<script setup>
import SinglePopupIndex from '@hooks/feedback/usePopupQueue/demo/SinglePopupIndex.vue';
</script>
<div>
<SinglePopupIndex/>
</div>
```

</details>

## 使用思路

usePopupQueue 代码直接看上仓库看

使用时：

- model 去使用 usePopupQueue 定义所有弹窗的静态配置和将后端传过来的 popupList 处理进弹窗队列中，并且导出给 外界使用的方法（外界不再接触 usePopupQueue）
- 然后唯一弹窗入口组件 SinglePopupIndex.vue 使用 model 里的数据和方法
- 具体到每一个弹窗组件只需要从 SinglePopupIndex 这里拿到传进来的数据进行展示和定义上一些事件即可
