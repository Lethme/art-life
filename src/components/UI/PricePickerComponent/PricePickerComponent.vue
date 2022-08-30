<template>
  <div class="filter__price-wrapper">
    <h4 class="filter-price__title">Ценовой диапазон</h4>

    <div class="filter-price__slider" :id="id"></div>

    <input
      id="min"
      autocomplete="off"
      name="price"
      type="hidden"
      :value="price.min"
    />
    <input
      id="max"
      autocomplete="off"
      name="price"
      type="hidden"
      :value="price.max"
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
        {{ getCurrencySign(CurrencyEnum.Rubble) }}
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
        {{ getCurrencySign(CurrencyEnum.Dollar) }}
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
        {{ getCurrencySign(CurrencyEnum.Euro) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Currency, Price, PricePickerState } from "./types";
import { getCurrencySign } from "./types/Currency";

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
    id: {
      required: true,
      type: String as PropType<string>,
    },
    modelValue: {
      required: false,
      type: Object as PropType<PricePickerState>,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      price: {
        min: +this.min,
        max: +this.max,
      },
      currency: Currency.Rubble,
      CurrencyEnum: Currency,
      pricePickerInitialized: false,
    };
  },
  emits: ["statechange", "update:modelValue"],
  computed: {
    state(): PricePickerState {
      return {
        currency: this.currency,
        price: { ...this.price },
      };
    },
    initialized(): boolean {
      return (
        this.price.min !== this.min ||
        this.price.max !== this.max ||
        this.pricePickerInitialized
      );
    },
  },
  mounted() {
    /* Another forced thing to make price picker work */
    /* Check /public/js/apps.js for document.initRangedSlider */

    const init = async () => {
      const initRangedSlider: InitFunc = (document as any).initRangedSlider;

      if (initRangedSlider) {
        if (this.modelValue) {
          this.price.min = this.modelValue.price.min;
          this.price.max = this.modelValue.price.max;
          this.currency = this.modelValue.currency;
        }

        initRangedSlider(
          this.id,
          { ...this.price },
          { min: this.min, max: this.max },
          1,
          (values, handle) => {
            this.price = {
              min: +values[0],
              max: +values[1],
            };

            if (this.initialized) {
              this.pricePickerInitialized = true;
              this.$emit("statechange", this.state);
              this.$emit("update:modelValue", this.state);
            }
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
        this.$emit("statechange", this.state);
        this.$emit("update:modelValue", this.state);
      }
    },
    getCurrencySign,
  },
});
</script>

<style lang="less" scoped>
@import "PricePickerComponent";
</style>
