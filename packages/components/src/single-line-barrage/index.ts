import SingleLineBarrageVue, {
  type SingleLineBarrageProps,
  type SingleLineBarrageSlots
} from './SingleLineBarrageClosely.vue';
const SingleLineBarrage = SingleLineBarrageVue as new <T>(
  props: SingleLineBarrageProps<T>
) => {
  $props: typeof props;
  $scopedSlots: SingleLineBarrageSlots<T>;
};
export default SingleLineBarrage;
