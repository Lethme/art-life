<template>
  <ul class="filter-calendar__list">
    <art-life-filter-datepicker-link
      class="filter-calendar__item"
      v-for="item in items"
      :item="item"
      :key="item.title"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeFilterDatepickerLink from "../FilterDatepickerLinkComponent";
import { PopularItem } from "./types";

export default defineComponent({
  name: "ArtLifeFilterDatepickerList",
  components: {
    ArtLifeFilterDatepickerLink,
  },
  props: {
    items: {
      required: true,
      type: Array as () => Array<PopularItem>,
    },
  },
});
</script>

<style lang="less" scoped>
@import "FilterDatepickerListComponent";
</style>
