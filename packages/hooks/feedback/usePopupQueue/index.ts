import { shallowRef, nextTick } from 'vue';
import type { Component } from 'vue/types/options';
interface Popup<T> {
  data?: T;
  type: string | number;
  unique?: boolean;
  priority?: number;
  component?: Component;
  customInsert?: (queue: Popup<unknown>[], popup: Popup<unknown>) => void; //配置这个方法让用户自己决定这个弹窗插到队列的哪里，而不参与内部的按照优先级插入队列的方法。
}

interface PopupsConfig {
  // 各个弹窗的配置
  [key: string | number]: Popup<unknown>;
}

function insertToQueue<T>(popup: Popup<T>, queue: Popup<T>[]) {
  const insertIndex = queue.findIndex((q) => q.priority! < popup.priority!);
  if (insertIndex === -1) {
    queue.push(popup);
  } else {
    queue.splice(insertIndex, 0, popup);
  }
}

export type Listener = (popup?: Popup<unknown>) => void;
export type EventsConfig = {
  // 用户给每个弹窗都加上的事件（事件可以理解成是生命周期）
  onPopupShow?: Listener;
  onPopupClose?: Listener;
  onQueueEmpty?: () => void;
};
function usePopupQueue(popupsConfig?: PopupsConfig, events?: EventsConfig) {
  //注册各个弹窗的静态配置 和 配置一些每个弹窗都会触发的事件
  const currentPopup = shallowRef<Popup<unknown> | null>(null); //ref是深层次的，我这里不需要深层次所以用shallowRef
  let queue: Popup<unknown>[] = [];
  let isPaused = false;
  const totalPopupsConfig: PopupsConfig = {
    //拷贝一份各个弹窗的配置，不允许修改传进来的原配置
    ...popupsConfig
  };

  function pushPopup<T>(_popup: Popup<T>) {
    const popup = {
      priority: 1, // 赋予默认优先级
      unique: false, //赋予默认不是唯一的
      ...totalPopupsConfig[_popup.type], //全局配置的时候弹窗的一些静态配置：比如component,unique等
      ..._popup // push传进来的弹窗的名字 type 和 弹窗的一些动态配置，比如data
    };
    if (
      popup.unique &&
      [currentPopup.value, ...queue].find((q) => q?.type === popup.type)
    ) {
      // 如果该弹窗要求是只能有一个且队列中有重复组件，不作处理
    } else if (popup.customInsert) {
      popup.customInsert(queue, popup);
    } else {
      insertToQueue(popup, queue);
    }
    if (currentPopup.value === null && queue.length === 1) {
      showNextPopup();
    }
  }
  function closeCurrentPopup() {
    events?.onPopupClose?.();
    currentPopup.value = null;
  }

  async function showNextPopup() {
    if (isPaused) {
      return;
    }
    if (currentPopup.value !== null) {
      closeCurrentPopup();
    }
    await nextTick();
    if (queue.length > 0) {
      const popup = queue.shift();
      if (!popup) return;
      currentPopup.value = {
        ...totalPopupsConfig[popup.type],
        ...popup
      };
      events?.onPopupShow?.();
    } else {
      events?.onQueueEmpty?.();
    }
  }
  function clearPopups(whitelist?: Array<string | number> | undefined) {
    if (whitelist && whitelist.length > 0) {
      queue = queue.filter((popup: Popup<unknown>) => {
        return !whitelist.includes(popup.type);
      });
    } else {
      queue = [];
    }
  }
  function pause() {
    isPaused = true;
  }
  function play() {
    isPaused = false;
    showNextPopup();
  }
  function updatePopupsConfig(popupsConfig?: PopupsConfig) {
    Object.assign(totalPopupsConfig, popupsConfig);
  }
  return {
    updatePopupsConfig,
    pushPopup,
    showNextPopup,
    clearPopups,
    closeCurrentPopup,
    currentPopup,
    pause,
    play,
    isPaused
  };
}
export default usePopupQueue;
