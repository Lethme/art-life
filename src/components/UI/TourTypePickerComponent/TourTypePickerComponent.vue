<template>
  <ul class="dropdown-filter__list filter-tour__list">
    <span v-if="tourTypesFetched"
      ><li v-for="tourType in this.$store.getters.tourTypes" :key="tourType.id">
        <art-life-checkbox
          @statechange="(state) => select(tourType, state)"
          :label-text="tourType.name"
          :model-value="selected.some((type) => type.id === tourType.id)"
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
import TourType from "@/api/types/TourType";
import tour from "@/api/types/Tour";

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
      type: Array as () => TourType[],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected: new Array<TourType>(),
    };
  },
  created() {
    this.selected = this.modelValue;
  },
  methods: {
    select(type: TourType, state: boolean) {
      if (state) {
        if (!this.selected.some((tourType) => tourType.id === type.id)) {
          this.selected.push(type);
        }
      } else {
        this.selected = this.selected.filter(
          (tourType) => tourType.id !== type.id
        );
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
