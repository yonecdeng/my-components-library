# 基础工具

## 加载图片

```ts
async function loadImage(
  el: HTMLImageElement,
  src: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    //绑定事件
    el.onload = () => {
      resolve(el);
    };
    el.onerror = () => {
      reject(src);
    };
    //加载图片
    el.src = src;
  });
}
```

## 重试

```ts
async function retry<F extends (...args: any[]) => Promise<any>>( // ...args:any[] 声明会有无数个参数
  fn: F,
  params: any[],
  retryTimes = 3
) {
  let count = retryTimes - 1;
  return new Promise((resolve, reject) => {
    function tryLoad() {
      fn.apply(null, [...params]) //[...params]复制一份原数据，避免修改了原数据
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (count > 0) {
            tryLoad();
            count--;
          } else {
            reject(err);
          }
        });
    }
    tryLoad();
  });
}
```

## 重试加载图片

```ts
export async function retryLoadImage(
  el: HTMLImageElement,
  src: string,
  fallbackSrc: string,
  retryTimes = 1,
  onLoad?: () => void,
  onError?: () => void
) {
  const imgElm = el;
  try {
    const res = await retry(loadImage, [imgElm, src, retryTimes]);
    if (res) {
      onLoad?.();
    }
  } catch (error) {
    imgElm.src = fallbackSrc;
    onError?.();
  }
}
```
