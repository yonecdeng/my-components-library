import LoaderVue, { type LoaderProps, type LoaderSlots } from './Loader.vue';

const Loader = LoaderVue as new <T>(props: LoaderProps) => {
  $props: typeof props;
  $scopedSlots: LoaderSlots<T>;
};
export default Loader;
