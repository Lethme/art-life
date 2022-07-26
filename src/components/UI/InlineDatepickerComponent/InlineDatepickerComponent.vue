<template>
  <datepicker
    :disabled-dates="disabledDates"
    :monday-first="true"
    :inline="true"
    :typeable="false"
    :value="modelValue"
    @selected="dateSelected"
    :language="lang"
    calendar-class="no-shadow no-topbar"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

/* It's actually a component from vuejs3-datepicker package */
/* https://www.npmjs.com/package/vuejs3-datepicker */
import Datepicker from "@/components/UI/DatePickerComponent";
import { InlineDatepickerState } from "./types";

export default defineComponent({
  name: "ArtLifeInlineDatepicker",
  components: {
    Datepicker,
  },
  props: {
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
  methods: {
    dateSelected(date: Date | null) {
      let newDate: Date | null;

      if (
        Math.abs(this.modelValue?.getTime() - date?.getTime()) <
        24 * 60 * 60 * 1000
      ) {
        newDate = null;
      } else {
        newDate = date;
      }

      this.$emit("statechange", { date: newDate });
      this.$emit("update:modelValue", newDate);
    },
  },
});
</script>

<style lang="less" scoped>
@import "InlineDatepickerComponent";
</style>
