<template>
  <datepicker
    :disabled-dates="disabledDates"
    :monday-first="true"
    :inline="true"
    :typeable="false"
    :modelValue="value"
    :value="value"
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
    value: {
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
  data() {
    return {
      date: this.value,
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
      if (this.date?.getTime() === date?.getTime()) {
        this.date = null;
      } else {
        this.date = date;
      }

      this.$emit("statechange", this.state);
      this.$emit("update:modelValue", this.date);
    },
  },
});
</script>

<style lang="less" scoped>
@import "InlineDatepickerComponent";
</style>
