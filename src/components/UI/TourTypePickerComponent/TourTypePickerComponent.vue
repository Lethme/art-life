<template>
  <ul class="dropdown-filter__list filter-tour__list">
    <span v-if="tourTypesFetched"
      ><li v-for="tourType in this.$store.getters.tourTypes" :key="tourType.id">
        <art-life-checkbox
          @statechange="(state) => select(tourType.id, state)"
          :label-text="tourType.name"
          :model-value="selected.indexOf(tourType.id) !== -1"
        /></li
    ></span>
    <span v-else>
      <li v-for="i in 12" :key="i">
        <art-life-checkbox-skeleton />
      </li>
    </span>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeCheckbox from "@/components/UI/CheckboxComponent/CheckboxComponent.vue";
import ArtLifeCheckboxSkeleton from "@/components/UI/CheckboxComponent/skeleton/CheckboxSkeletonComponent.vue";

export default defineComponent({
  name: "ArtLifeTourTypePicker",
  components: { ArtLifeCheckboxSkeleton, ArtLifeCheckbox },
  props: {
    tourTypesFetched: {
      required: false,
      type: Boolean,
      default: false,
    },
    modelValue: {
      required: false,
      type: Array as () => number[],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  created() {
    this.selected = this.modelValue;
  },
  methods: {
    select(id: number, state: boolean) {
      if (state) {
        if (this.selected.indexOf(id) === -1) {
          this.selected.push(id);
        }
      } else {
        this.selected = this.selected.filter((tourId) => tourId !== id);
      }

      this.$emit("update:modelValue", this.selected);
      this.$emit("statechange", this.selected);
    },
  },
});
</script>

<style lang="less" scoped>
@import "./TourTypePickerComponent";
</style>
