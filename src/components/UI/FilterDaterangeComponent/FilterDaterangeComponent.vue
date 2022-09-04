<template>
  <div class="filter-calendar__body">
    <div data-datepicker class="filter-calendar__main">
      <art-life-inline-datepicker
        lang="ru"
        :from="dateFromLimit.from"
        :to="dateFromLimit.to"
        @statechange="dateStateChanged"
        @prevClick="decreaseOffset"
        @dateHover="hoverDate"
        :open-date="leftOffset"
        :show-next-button="false"
        :highlighted-dates="highlightedDates"
        :selected-dates="selectedDates"
      />
      <art-life-inline-datepicker
        lang="ru"
        :from="dateFromLimit.from"
        :to="dateFromLimit.to"
        @statechange="dateStateChanged"
        @nextClick="increaseOffset"
        @dateHover="hoverDate"
        :open-date="rightOffset"
        :show-prev-button="false"
        :highlighted-dates="highlightedDates"
        :selected-dates="selectedDates"
      />
    </div>
    <aside class="filter-calendar__right">
      <h4 class="filter-calendar__title">Популярное</h4>
      <art-life-filter-datepicker-list :items="popularItems" />
    </aside>

    <div class="filter-calendar__bottom">
      {{ bottomHintText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import { InlineDatepickerState } from "@/components/UI/InlineDatepickerComponent/types";
import { FilterDatepickerState } from "@/components/UI/FilterDatepickerComponent/types";
import ArtLifeInlineDatepicker from "@/components/UI/InlineDatepickerComponent";
import ArtLifeFilterDatepickerList from "@/components/UI/FilterDatepickerListComponent";
import {
  FilterDaterangeState,
  HighlightedDates,
} from "@/components/UI/FilterDaterangeComponent/types";
import { datesEqual } from "@/api/utils/datesEqual";

export default defineComponent({
  name: "ArtLifeFilterDaterange",
  props: {
    openDate: {
      type: Object as () => FilterDaterangeState,
      default: null,
    },
  },
  components: {
    ArtLifeInlineDatepicker,
    ArtLifeFilterDatepickerList,
  },
  data() {
    return {
      dateFrom: this.openDate?.from || null,
      dateTo: this.openDate?.to || null,
      dateHovered: null,
      calendarOffset: this.openDate?.offset || new Date(),
      popularItems: [
        {
          title: "Все время",
          click: () => {
            this.dateFrom = null;
            this.dateTo = null;
            this.emitStateChange();
          },
        },
        {
          title: "Сегодня",
          click: () => {
            const today = new Date(Date.now());
            this.dateFrom = new Date(today) as any;
            this.dateTo = null;
            //this.dateTo = new Date(today) as any;
            this.emitStateChange();
          },
        },
        {
          title: "Эта неделя",
          click: () => {
            const today = new Date(Date.now());
            today.setDate(today.getDate());
            today.setMonth(today.getMonth());
            const daysLeft = 7 - today.getDay();

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(
              today.getTime() + daysLeft * 24 * 60 * 60 * 1000
            ) as any;

            this.emitStateChange();
          },
        },
        {
          title: "Этот месяц",
          click: () => {
            const today = new Date(Date.now());
            const secondDate = new Date(today.getTime());
            secondDate.setMonth(today.getMonth() + 1);
            secondDate.setDate(0);

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(secondDate) as any;
            this.emitStateChange();
          },
        },
        {
          title: "Следующие 7 дней",
          click: () => {
            const today = new Date(Date.now());

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(
              today.getTime() + 7 * 24 * 60 * 60 * 1000
            ) as any;
            this.emitStateChange();
          },
        },
        {
          title: "Следующие 30 дней",
          click: () => {
            const today = new Date(Date.now());

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(
              today.getTime() + 30 * 24 * 60 * 60 * 1000
            ) as any;
            this.emitStateChange();
          },
        },
        {
          title: "Следующие 3 месяца",
          click: () => {
            const today = new Date(Date.now());
            const secondDate = new Date(today);
            secondDate.setMonth(today.getMonth() + 3);
            secondDate.setDate(0);

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(secondDate) as any;
            this.emitStateChange();
          },
        },
        {
          title: "Этот год",
          click: () => {
            const today = new Date(Date.now());
            const secondDate = new Date(today);
            secondDate.setMonth(12);
            secondDate.setDate(0);

            this.dateFrom = new Date(today) as any;
            this.dateTo = new Date(secondDate) as any;
            this.emitStateChange();
          },
        },
      ],
    };
  },
  emits: ["statechange"],
  computed: {
    state(): FilterDaterangeState {
      return {
        from: this.dateFrom,
        to: this.dateTo,
        offset: this.calendarOffset,
      };
    },
    leftOffset() {
      return this.calendarOffset;
    },
    rightOffset() {
      const offset = new Date(this.calendarOffset);
      offset.setMonth(this.calendarOffset.getMonth() + 1);
      return offset;
    },
    highlightedDates(): HighlightedDates {
      if (!this.dateFrom) return null;

      return {
        from: this.dateFrom,
        to: this.dateTo || this.dateHovered,
      };
    },
    selectedDates(): Array<Date> {
      const arr = [];
      arr.push(this.dateFrom, this.dateTo);
      return arr;
    },
    currentDate() {
      const today = new Date(Date.now());
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
    dateFromLimit() {
      return {
        from: this.dateFrom || this.currentDate,
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

        if (daysBetween === 0) {
          return `${dateFromMoment.format("MMMM D, YYYY")}`;
        }

        return `${dateFromMoment.format(
          "MMMM D, YYYY"
        )} - ${dateToMoment.format("MMMM D, YYYY")} (${moment
          .duration(daysBetween, "day")
          .asDays()} ${this.getLocaleDays(daysBetween)})`;
      }

      if (this.dateFrom) {
        const dateFromMoment = moment(this.dateFrom.getTime());
        return `${dateFromMoment.format("MMMM D, YYYY")}`;
      }

      return "За всё время";
    },
  },
  methods: {
    emitStateChange() {
      this.$emit("statechange", this.state);
    },
    increaseOffset() {
      const offset = new Date(this.calendarOffset);
      offset.setMonth(offset.getMonth() + 1);
      this.calendarOffset = offset;
      this.emitStateChange();
    },
    decreaseOffset() {
      const offset = new Date(this.calendarOffset);

      if (offset.getMonth() > this.dateFromLimit.from.getMonth()) {
        offset.setMonth(offset.getMonth() - 1);
        this.calendarOffset = offset;
        this.emitStateChange();
      }
    },
    dateStateChanged(state: InlineDatepickerState) {
      if (this.dateTo && datesEqual(this.dateTo, state.date)) {
        if (datesEqual(this.dateFrom, this.dateTo)) {
          this.dateFrom = null;
        }
        this.dateTo = null;
        this.emitStateChange();
        return;
      }

      if (!this.dateFrom) {
        this.dateFrom = state.date ? new Date(state.date) : null;
      } else {
        if (datesEqual(this.dateFrom, state.date) && !this.dateTo) {
          this.dateFrom = null;
        } else {
          this.dateTo = state.date ? new Date(state.date) : null;
        }
      }

      this.emitStateChange();
    },
    hoverDate(date?: Date) {
      this.dateHovered = date ? new Date(date) : null;
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
@import "FilterDaterangeComponent";
</style>
