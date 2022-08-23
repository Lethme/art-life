<template>
  <datepicker
    :disabled-dates="disabledDates"
    :monday-first="true"
    :inline="true"
    :typeable="false"
    :value="modelValue"
    :selected-dates="selectedDates"
    @selected="dateSelected"
    @nextClick="nextClick"
    @prevClick="prevClick"
    @dateHover="hoverDate"
    @dateClick="clickDate"
    :language="lang"
    calendar-class="no-shadow no-topbar"
    :open-date="openDate"
    :show-prev-button="showPrevButton"
    :show-next-button="showNextButton"
    :highlighted-dates="highlightedDates"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

/* It's actually a component from vuejs3-datepicker package */
/* https://www.npmjs.com/package/vuejs3-datepicker */
import Datepicker from "@/components/UI/DatePickerComponent";
import { InlineDatepickerState } from "./types";
import { validateDateInput } from "@/components/UI/DatePickerComponent/datepicker/utils/DateUtils";
import { HighlightedDates } from "@/components/UI/FilterDaterangeComponent/types";

export default defineComponent({
  name: "ArtLifeInlineDatepicker",
  components: {
    Datepicker,
  },
  props: {
    showPrevButton: {
      type: Boolean,
      default: true,
    },
    showNextButton: {
      type: Boolean,
      default: true,
    },
    highlightedDates: {
      type: Object as () => HighlightedDates,
      default: null,
    },
    selectedDates: {
      type: Array as () => Array<Date>,
      default: new Array<Date>(),
    },
    from: {
      required: false,
      type: Object as () => Date,
    },
    to: {
      required: false,
      type: Object as () => Date,
    },
    modelValue: {
      required: false,
      type: Object as () => Date,
      default() {
        return null;
      },
    },
    lang: {
      required: false,
      type: String as () => string,
      default() {
        return "ru";
      },
    },
    openDate: {
      validator: (val: Date): boolean => validateDateInput(val),
      type: Date as new () => Date,
      default: new Date(),
    },
  },
  data() {
    return {
      prevDate: null,
    };
  },
  computed: {
    dateFrom() {
      if (this.from) {
        //const date = new Date(this.from.getTime() - 24 * 60 * 60 * 1000);
        return new Date(
          this.from.getFullYear(),
          this.from.getMonth(),
          this.from.getDate()
        );
      }

      return null;
    },
    dateTo() {
      if (this.to) {
        return this.to;
      }

      return null;
    },
    disabledDates() {
      return {
        /* Props are gonna tell picker what dates are available */
        /* But datepicker's api can only disable dates */
        /* So we're using our props to enable dates we need */
        to: this.dateFrom,
        from: this.dateTo,
      };
    },
  },
  emits: [
    "statechange",
    "update:modelValue",
    "prev-click",
    "next-click",
    "date-hover",
    "date-click",
  ],
  methods: {
    prevClick() {
      this.$emit("prev-click");
    },
    nextClick() {
      this.$emit("next-click");
    },
    hoverDate(date?: Date) {
      this.$emit("date-hover", date);
    },
    clickDate(date: Date) {
      this.$emit("date-click", date);
    },
    dateSelected(date: Date | null) {
      this.$emit("statechange", { date, prev: this.prevDate });
      this.$emit("update:modelValue", date);
      this.prevDate = date;
    },
  },
});
</script>

<style lang="less" scoped>
@import "InlineDatepickerComponent";
</style>
