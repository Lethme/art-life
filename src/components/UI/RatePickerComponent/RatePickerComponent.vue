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

export default defineComponent({
  name: "ArtLifeRatePicker",
  props: {
    maxRate: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 5;
      },
    },
    staticRate: {
      required: false,
      type: Number as PropType<number>,
    },
  },
  data() {
    return {
      rate: 1,
      demoRate: 1,
    };
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
        this.$emit("ratechange", this.rate);
      }
    },
  },
});
</script>

<style lang="less">
@import "RatePickerComponent";
</style>
