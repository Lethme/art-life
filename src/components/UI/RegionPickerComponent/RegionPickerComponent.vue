<template>
  <div class="filter-country-wrapper">
    <div class="filter-country__search">
      <input
        autocomplete="off"
        type="text"
        :placeholder="searchPlaceholder"
        :class="`input${searchQuery ? ' filled' : ''}`"
        v-model="searchQuery"
      />
    </div>

    <div class="filter-country__body">
      <ul class="filter-country__list">
        <li
          v-for="region in renderedRegions"
          :key="region"
          :class="selected === region ? 'active' : ''"
          @click="() => select(region)"
        >
          <i class="icon-compass"></i> {{ region }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegionPickerState from "./types/State";

export default defineComponent({
  name: "ArtLifeRegionPicker",
  props: {
    regions: {
      required: true,
      type: Array as () => string[],
    },
    searchPlaceholder: {
      required: false,
      type: String as () => string,
      default() {
        return "Введите регион";
      },
    },
  },
  data() {
    return {
      selected: undefined,
      searchQuery: "",
    };
  },
  computed: {
    renderedRegions() {
      return this.regions.filter(
        (region) =>
          region.toLowerCase().indexOf(this.searchQuery.toLowerCase()) === 0
      );
    },
    state(): RegionPickerState {
      return {
        region: this.selected,
      };
    },
  },
  methods: {
    select(region: string) {
      this.selected = region;
      this.$emit("statechange", this.state);
    },
  },
});
</script>

<style lang="less" scoped>
@import "RegionPickerComponent";
</style>
