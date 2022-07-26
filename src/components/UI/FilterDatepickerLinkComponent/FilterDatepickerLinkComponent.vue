<template>
  <li @click="onClick">{{ item.title }}</li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PopularItem } from "../FilterDatepickerListComponent/types";

export default defineComponent({
  name: "ArtLifeFilterDatepickerLink",
  props: {
    item: {
      required: true,
      type: Object as () => PopularItem,
    },
  },
  methods: {
    onClick(e: Event) {
      this.item.click(e);
    },
  },
});
</script>

<style lang="less" scoped>
@import "FilterDatepickerLinkComponent";
</style>
