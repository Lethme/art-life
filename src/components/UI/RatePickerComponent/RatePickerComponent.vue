<template>
  <div
    class="rate-selector rate-selector-activity rating-js"
    @mouseleave="() => setDemoRate(1)"
  >
    <div
      v-for="index in maxRate"
      :class="`rate-selector-item${
        rate >= index || demoRate >= index ? ' active' : ''
      }`"
      :key="index"
      @mouseover="() => setDemoRate(index)"
      @click="() => setRate(index)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RatePickerState } from "./types";

export default defineComponent({
  name: "ArtLifeRatePicker",
  props: {
    staticRate: {
      required: false,
      type: Number as PropType<number>,
    },
    maxRate: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 5;
      },
    },
  },
  data() {
    return {
      rate: 1,
      demoRate: 1,
    };
  },
  computed: {
    state(): RatePickerState {
      return {
        rate: this.rate,
      };
    },
  },
  mounted() {
    if (this.staticRate) {
      this.rate = this.staticRate;
    }
  },
  methods: {
    setDemoRate(rate: number) {
      if (!this.staticRate) {
        this.demoRate = rate;
      }
    },
    setRate(rate: number) {
      if (!this.staticRate) {
        this.rate = rate;
        this.$emit("ratechange", this.state);
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import "RatePickerComponent";
</style>
