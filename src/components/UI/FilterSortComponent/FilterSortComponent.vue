<template>
  <ul class="dropdown-filter__list">
    <li v-for="item in sortingItems" :key="item.type">
      <art-life-checkbox
        :label-text="item.title"
        :model-value="
          modelValue.some((sortingItem) => sortingItem.type === item.type)
        "
        @statechange="(state) => selectFilter(state, item)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeCheckbox from "@/components/UI/CheckboxComponent/CheckboxComponent.vue";
import {
  FilterSortState,
  SortingItem,
  SortingType,
} from "@/components/UI/FilterSortComponent/types";

export default defineComponent({
  name: "ArtLifeFilterSort",
  components: { ArtLifeCheckbox },
  props: {
    modelValue: {
      type: Array as () => Array<SortingItem>,
      default() {
        return new Array<SortingItem>();
      },
    },
  },
  data() {
    return {
      selected: new Array<SortingItem>(),
    };
  },
  setup(props, context) {
    const sortingItems: Array<SortingItem> = [
      {
        type: SortingType.PriceDesc,
        title: "По убыванию цены",
      },
      {
        type: SortingType.PriceAsc,
        title: "По возрастанию цены",
      },
      {
        type: SortingType.Date,
        title: "По ближайшим датам",
      },
      {
        type: SortingType.Popular,
        title: "По популярности",
      },
    ];

    return {
      sortingItems,
    };
  },
  emits: ["update:modelValue", "statechange"],
  methods: {
    selectFilter(state: boolean, item: SortingItem) {
      if (state) {
        if (
          !this.selected.some((sortingItem) => sortingItem.type === item.type)
        ) {
          this.selected.push(item);
        }
      } else {
        this.selected = this.selected.filter(
          (sortingItem) => sortingItem.type !== item.type
        );
      }

      this.$emit("update:modelValue", this.selected);
      this.$emit("statechange", this.selected);
    },
  },
});
</script>

<style lang="less">
@import "./FilterSortComponent";
</style>
