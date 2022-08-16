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
          :class="modelValue === region.id ? 'active' : ''"
          @click="() => select(region)"
        >
          <i class="icon-compass"></i> {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegionPickerState from "./types/State";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";
import CountryType from "@/api/types/CountryType";

export default defineComponent({
  name: "ArtLifeRegionPicker",
  props: {
    // regions: {
    //   required: false,
    //   type: Array as () => string[],
    // },
    searchPlaceholder: {
      required: false,
      type: String as () => string,
      default() {
        return "Введите страну";
      },
    },
    modelValue: {
      required: false,
      type: Number,
      default() {
        return null;
      },
    },
    countriesFetched: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    renderedRegions() {
      return this.$store.getters.countries.filter(
        (region) =>
          region.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) ===
          0
      );
    },
  },
  methods: {
    select(region: CountryType) {
      this.selected = region;
      this.$emit("statechange", region);
      this.$emit("update:modelValue", region.id);
    },
  },
});
</script>

<style lang="less" scoped>
@import "RegionPickerComponent";
</style>
