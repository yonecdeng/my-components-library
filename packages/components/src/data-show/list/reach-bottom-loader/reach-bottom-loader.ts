import { ExtractPropTypes, type VNode } from 'vue';

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
export type LoaderEmits = typeof loaderEmits;

export type LoaderSlots = {
  default?: () => VNode[] | undefined;
};
