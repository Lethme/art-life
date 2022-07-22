<template>
  <div class="filter-price filter__price-wrapper">
    <h4 class="filter-price__title">Ценовой диапазон</h4>

    <div class="filter-price__slider" :id="id"></div>

    <input
      id="min"
      autocomplete="off"
      name="price"
      type="hidden"
      :value="price.min"
      @change="(e) => setMinPrice(e)"
    />
    <input
      id="max"
      autocomplete="off"
      name="price"
      type="hidden"
      :value="price.max"
      @change="(e) => setMaxPrice(e)"
    />

    <div class="filter-price__currency">
      <button
        type="button"
        @click="() => setCurrency(CurrencyEnum.Rubble)"
        :class="`filter-price__currency-item${
          currency === CurrencyEnum.Rubble
            ? ' filter-price__currency-current'
            : ''
        }`"
      >
        ₽
      </button>
      <button
        type="button"
        @click="() => setCurrency(CurrencyEnum.Dollar)"
        :class="`filter-price__currency-item${
          currency === CurrencyEnum.Dollar
            ? ' filter-price__currency-current'
            : ''
        }`"
      >
        $
      </button>
      <button
        type="button"
        @click="() => setCurrency(CurrencyEnum.Euro)"
        :class="`filter-price__currency-item${
          currency === CurrencyEnum.Euro
            ? ' filter-price__currency-current'
            : ''
        }`"
      >
        €
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Currency } from "./types";

type Price = {
  min: number;
  max: number;
};

type UpdateFunc = (values: number[], valueIndex: number) => void;

type InitFunc = (
  id: string,
  start: Price,
  range: Price,
  step: number,
  onUpdate: UpdateFunc
) => void;

export default defineComponent({
  name: "ArtLifePricePicker",
  props: {
    id: {
      required: true,
      type: String as PropType<string>,
    },
    min: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 0;
      },
    },
    max: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 100000;
      },
    },
    step: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      price: {
        min: this.min,
        max: this.max,
      },
      currency: Currency.Rubble,
      CurrencyEnum: Currency,
    };
  },
  mounted() {
    /* Another forced thing to make price picker work */
    /* Check /public/js/apps.js for document.initRangedSlider */
    const init = () => {
      const initRangedSlider: InitFunc = (document as any).initRangedSlider;

      if (initRangedSlider) {
        initRangedSlider(
          this.id,
          { ...this.price },
          { ...this.price },
          1,
          (values, handle) => {
            this.price = {
              min: +values[0],
              max: +values[1],
            };
          }
        );
      }
    };

    init();
    document.addEventListener("DOMContentLoaded", init);
  },
  methods: {
    setCurrency(c: Currency) {
      if (this.currency !== c) {
        this.currency = c;
        console.log(this.currency);
      }
    },
    setMinPrice(value: number) {
      console.log(value);
      if (value <= this.price.max) {
        this.price.min = value;
      }
    },
    setMaxPrice(value: number) {
      console.log(value);
      if (value >= this.price.min) {
        this.price.max = value;
      }
    },
  },
});
</script>

<style lang="less">
@import "PricePickerComponent";
</style>
