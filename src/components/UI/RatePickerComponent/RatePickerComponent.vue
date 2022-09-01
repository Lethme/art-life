<template>
  <div
    class="rate-selector rate-selector-activity rating-js"
    @mouseleave="() => setDemoRate(0)"
  >
    <div
      v-for="index in maxRate"
      :class="`rate-selector-item${
        (modelValue ?? rate) >= index || demoRate >= index ? ' active' : ''
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
    modelValue: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return undefined;
      },
    },
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
      rate: 0,
      demoRate: 0,
    };
  },
  mounted() {
    if (this.staticRate) {
      this.rate = this.staticRate;
      this.$emit("update:modelValue", this.staticRate);
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
        if (this.rate === rate) {
          this.rate = 0;
        } else {
          this.rate = rate;
        }

        this.$emit("update:modelValue", this.rate);
        this.$emit("statechange", { rate: this.rate });
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import "RatePickerComponent";
</style>
