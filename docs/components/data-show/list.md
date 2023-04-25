# List

## ScrollToBottomLoadList

### 示例

<script setup>
import { reactive } from 'vue';
import Loader from '@components-library/feedback/loader'
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      data.push(...[6, 7, 8, 9, 10]);
      resolve([6, 7, 8, 9, 10]);
    }, 1500);
  });
};
const data = reactive([1, 2, 3, 4, 5]);
</script>
<style scoped>
.container{
    height:100px;
    overflow:auto;
}
</style>
  <div class="container">
    <div v-for="item of data" :key="item">
      {{ item }}
    </div>
    <Loader @to-bottom="getData"> 正在加载中 </Loader>
  </div>

<details>
<summary>展开查看代码</summary>

```vue
<script setup>
import { reactive } from 'vue';
import Loader from '@components-library/feedback/loader'
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      data.push(...[6, 7, 8, 9, 10]);
      resolve([6, 7, 8, 9, 10]);
    }, 1500);
  });
};
const data = reactive([1, 2, 3, 4, 5]);
</script>
<style scoped>
.container{
    height:100px;
    overflow:auto;
}
</style>
  <div class="container">
    <div v-for="item of data" :key="item">
      {{ item }}
    </div>
    <Loader @to-bottom="getData"> 正在加载中 </Loader>
  </div>
```

</details>

### props&slots

```ts
export const loaderProps = {
  rootMargin: {
    type: String,
    default: '0px 0px 0px 0px',
    required: false
  }
};
export type LoaderProps = Partial<ExtractPropTypes<typeof loaderProps>>;

export const loaderEmits = {
  'to-bottom': () => true
};
```
