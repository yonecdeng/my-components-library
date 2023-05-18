# 移动端

## 单位

```ts
/**单位相关的函数 */
export const rootValue = 100; //设计稿里根字体的大小
export const targetViewWidth = 414; //设计稿的宽度
export const maxViewWidth = 560; //限制在移动端大屏中的最大展示尺寸

export function px2rem(px: number) {
  if (typeof px !== 'number') {
    // TODO: runtime error?
    throw new Error('px2rem: px must be a number');
  }

  return `${px / rootValue}rem`; //因为此时设置的px值是根据设计稿设计的，所以px/rootValue就得到相对于根字体的倍数
}

export function px2vw(px: number) {
  if (typeof px !== 'number') {
    // TODO: runtime error?
    throw new Error('px2vw: px must be a number');
  }

  return `${((px * 100) / targetViewWidth).toFixed(3)}vw`;
}

export function getViewRatio(targetWidth: number): () => number {
  if (typeof targetWidth !== 'number') {
    return () => 1;
  }
  const value =
    Math.min(document.documentElement.clientWidth, maxViewWidth) / targetWidth;
  return () => {
    return value;
  };
}

//使单位转为适配大屏的单位
export function transViewValue(value: number): number {
  if (typeof value !== 'number') {
    return 0;
  }
  const viewRatio = getViewRatio(targetViewWidth);
  return value * viewRatio();
}
```
