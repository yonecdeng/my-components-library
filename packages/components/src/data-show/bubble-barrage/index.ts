import BubbleBarrageVue, {
  type BubbleBarrageProps,
  type BubbleBarrageSlots
} from './BubbleBarrage.vue';

const BubbleBarrage = BubbleBarrageVue as new <T>(
  props: BubbleBarrageProps
) => {
  $props: typeof props;
  $scopedSlots: BubbleBarrageSlots<T>;
};
export default BubbleBarrage;
