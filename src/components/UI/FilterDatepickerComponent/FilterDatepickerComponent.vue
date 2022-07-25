<template>
  <div class="filter-calendar__body">
    <div data-datepicker class="filter-calendar__main">
      <art-life-inline-datepicker
        lang="ru"
        :from="dateFromLimit.from"
        @statechange="dateFromStateChanged"
        :value="dateFrom"
      />
      <art-life-inline-datepicker
        lang="ru"
        :from="dateToLimit.from"
        :to="dateToLimit.to"
        @statechange="dateToStateChange"
        :value="dateTo"
      />
    </div>
    <aside class="filter-calendar__right">
      <h4 class="filter-calendar__title">Популярное</h4>

      <ul class="filter-calendar__list">
        <li>Все время</li>
        <li>Сегодня</li>
        <li>Эта неделя</li>
        <li>Этот месяц</li>
        <li>Последние 7 дней</li>
        <li>Последние 30 дней</li>
        <li>Последние 3 месяца</li>
        <li>Этот год</li>
        <li>Предыдущий год</li>
      </ul>
    </aside>

    <div class="filter-calendar__bottom">
      {{ bottomHintText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import ArtLifeInlineDatepicker from "@/components/UI/InlineDatepickerComponent";
import { InlineDatepickerState } from "@/components/UI/InlineDatepickerComponent/types";
import { FilterDatepickerState } from "@/components/UI/FilterDatepickerComponent/types";

export default defineComponent({
  name: "ArtLifeFilterDatepicker",
  props: {
    dates: {
      required: false,
      type: Object as () => FilterDatepickerState,
      default() {
        return {
          from: null,
          to: null,
        };
      },
    },
  },
  components: {
    ArtLifeInlineDatepicker,
  },
  data() {
    return {
      dateFrom: null,
      dateTo: null,
    };
  },
  created() {
    if (this.dates) {
      this.dateFrom = this.dates.from ? this.dates.from : null;
      this.dateTo = this.dates.to ? this.dates.to : null;
    }
  },
  computed: {
    state(): FilterDatepickerState {
      return {
        from: this.dateFrom,
        to: this.dateTo,
      };
    },
    dateFromLimit() {
      return {
        from: new Date(Date.now()),
        to: null,
      };
    },
    dateToLimit() {
      const from = this.dateFrom
        ? new Date(this.dateFrom.getTime() + 2 * (24 * 60 * 60 * 1000))
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      return {
        from,
        to: null,
      };
    },
    bottomHintText(): string {
      if (this.dateTo) {
        const dateFromMoment = moment(
          this.dateFrom ? this.dateFrom.getTime() : Date.now()
        );
        const dateToMoment = moment(this.dateTo.getTime());
        const daysBetween = dateToMoment.diff(dateFromMoment, "days");

        return `${dateFromMoment.format(
          "MMMM D, YYYY"
        )} - ${dateToMoment.format("MMMM D, YYYY")} (${moment
          .duration(daysBetween, "day")
          .asDays()} ${this.getLocaleDays(daysBetween)})`;
      }

      if (this.dateFrom) {
        const dateFromMoment = moment(this.dateFrom.getTime());
        return `С ${dateFromMoment.format("MMMM D, YYYY")}`;
      }

      return "Не выбрано";
    },
  },
  methods: {
    dateFromStateChanged(state: InlineDatepickerState) {
      this.dateFrom = state.date;

      if (
        this.dateFrom &&
        this.dateTo &&
        this.dateFrom.getTime() > this.dateTo.getTime()
      ) {
        this.dateTo = null;
      }

      this.$emit("statechange", this.state);
    },
    dateToStateChange(state: InlineDatepickerState) {
      this.dateTo = state.date;

      if (this.dateTo && !this.dateFrom) {
        this.dateFrom = new Date(Date.now());
      }

      this.$emit("statechange", this.state);
    },
    getLocaleDays(daysAmount) {
      return this.getNoun(daysAmount, "день", "дня", "дней");
    },
    getNoun(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    },
  },
});
</script>

<style lang="less" scoped>
@import "FilterDatepickerComponent";
</style>
