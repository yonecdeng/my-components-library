import SingleLineBarrageVue, {
  type SingleLineBarrageProps,
  type SingleLineBarrageSlots,
  Mode
} from './SingleLineBarrage.vue';
const SingleLineBarrage = SingleLineBarrageVue as new <T>(
  props: SingleLineBarrageProps
) => {
  $props: typeof props;
  $scopedSlots: SingleLineBarrageSlots<T>;
};
export { Mode };
export default SingleLineBarrage;
