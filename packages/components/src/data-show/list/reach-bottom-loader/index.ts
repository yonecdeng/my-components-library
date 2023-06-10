import LoaderVue from './ReachBottomLoader.vue';
import {
  type LoaderProps,
  type LoaderSlots,
  type LoaderEmits
} from './reach-bottom-loader';
const Loader = LoaderVue as unknown as new () => {
  $props: LoaderProps;
  $emit: LoaderEmits;
  $scopedSlots: LoaderSlots;
};
export default Loader;
