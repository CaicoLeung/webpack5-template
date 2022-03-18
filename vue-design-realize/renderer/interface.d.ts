import type { VNode as VueNode } from "vue";

export interface VNode {
  tag: string;
  props: VueNode['props'];
  children: string | VNode[];
}
