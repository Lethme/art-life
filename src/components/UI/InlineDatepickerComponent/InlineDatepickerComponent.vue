<template>
  <datepicker
    :disabled-dates="disabledDates"
    :monday-first="true"
    :inline="true"
    :typeable="false"
    :value="date"
    @selected="dateSelected"
    :language="lang"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    lang: {
      required: false,
      type: String as () => string,
      default() {
        return "ru";
      },
    },
  },
  data() {
    return {
      date: undefined,
    };
  },
  computed: {
    state(): InlineDatepickerState {
      return {
        date: this.date,
      };
    },
    dateFrom() {
      if (this.from) {
        const date = new Date(this.from);
        return new Date(date.setTime(date.getTime() - 24 * 60 * 60 * 1000));
      }

      return undefined;
    },
    dateTo() {
      if (this.to) {
        return this.to;
      }

      return undefined;
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
      this.date = date;
      this.$emit("statechange", this.state);
    },
  },
});
</script>

<style lang="less">
@import "InlineDatepickerComponent";
</style>
