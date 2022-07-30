<template>
  <div class="filter-calendar__body">
    <div data-datepicker class="filter-calendar__main">
      <art-life-inline-datepicker
        lang="ru"
        :from="dateFromLimit.from"
        :to="dateFromLimit.to"
        @statechange="dateFromStateChanged"
        v-model="dateFrom"
      />
      <art-life-inline-datepicker
        lang="ru"
        :from="dateToLimit.from"
        :to="dateToLimit.to"
        @statechange="dateToStateChanged"
        v-model="dateTo"
      />
    </div>
    <aside class="filter-calendar__right">
      <h4 class="filter-calendar__title">Популярное</h4>
      <art-life-filter-datepicker-list :items="popularItems" />
      <!--      <ul class="filter-calendar__list">-->
      <!--        <li>Все время</li>-->
      <!--        <li>Сегодня</li>-->
      <!--        <li>Эта неделя</li>-->
      <!--        <li>Этот месяц</li>-->
      <!--        <li>Последние 7 дней</li>-->
      <!--        <li>Последние 30 дней</li>-->
      <!--        <li>Последние 3 месяца</li>-->
      <!--        <li>Этот год</li>-->
      <!--        <li>Предыдущий год</li>-->
      <!--      </ul>-->
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

export default defineComponent({
  name: "ArtLifeFilterDatepicker",
  // props: {
  //   modelValue: {
  //     required: false,
  //     type: Object as () => FilterDatepickerState,
  //     default() {
  //       return {
  //         from: null,
  //         to: null,
  //       };
  //     },
  //   },
  // },
  components: {
    ArtLifeInlineDatepicker,
    ArtLifeFilterDatepickerList,
  },
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      popularItems: [
        {
          title: "Все время",
          click: (e) => {
            this.dateStateChanged({ date: null }, { date: null });
          },
        },
        {
          title: "Сегодня",
          click: (e) => {
            const today = new Date(Date.now());
            this.dateStateChanged({ date: today }, { date: today });
          },
        },
        {
          title: "Эта неделя",
          click: (e) => {
            const today = new Date(Date.now());
            today.setDate(today.getDate());
            today.setMonth(today.getMonth());
            const daysLeft = 7 - today.getDay();

            this.dateStateChanged(
              { date: today },
              {
                date: new Date(
                  today.getTime() + daysLeft * 24 * 60 * 60 * 1000
                ),
              }
            );
          },
        },
        {
          title: "Этот месяц",
          click: (e) => {
            const today = new Date(Date.now());
            const secondDate = new Date(today.getTime());
            secondDate.setMonth(today.getMonth() + 1);
            secondDate.setDate(0);

            this.dateStateChanged({ date: today }, { date: secondDate });
          },
        },
        {
          title: "Последние 7 дней",
          click: (e) => {
            const today = new Date(Date.now());
            this.dateStateChanged(
              { date: today },
              {
                date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
              }
            );
          },
        },
        {
          title: "Последние 30 дней",
          click: (e) => {
            const today = new Date(Date.now());
            this.dateStateChanged(
              { date: today },
              {
                date: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
              }
            );
          },
        },
        {
          title: "Последние 3 месяца",
          click: (e) => {
            const today = new Date(Date.now());
            const secondDate = new Date(today);
            secondDate.setMonth(today.getMonth() + 3);
            secondDate.setDate(0);

            this.dateStateChanged({ date: today }, { date: secondDate });
          },
        },
        {
          title: "Этот год",
          click: (e) => {
            const today = new Date(Date.now());
            const secondDate = new Date(today);
            secondDate.setMonth(12);
            secondDate.setDate(0);

            this.dateStateChanged({ date: today }, { date: secondDate });
          },
        },
      ],
    };
  },
  computed: {
    state(): FilterDatepickerState {
      return {
        from: this.dateFrom,
        to: this.dateTo,
      };
    },
    currentDate() {
      const today = new Date(Date.now());
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
    dateFromLimit() {
      return {
        from: this.currentDate,
        to: this.dateTo && !this.dateFrom ? new Date(this.dateTo) : null,
      };
    },
    dateToLimit() {
      const today = this.currentDate;
      const from = this.dateFrom ? new Date(this.dateFrom.getTime()) : today;

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
    dateFromStateChanged(state: InlineDatepickerState, silent?: boolean) {
      this.dateFrom = state.date;

      if (
        this.dateFrom &&
        this.dateTo &&
        this.dateFrom.getTime() > this.dateTo.getTime()
      ) {
        this.dateTo = null;
      }

      if (!silent) this.$emit("statechange", this.state);
    },
    dateToStateChanged(state: InlineDatepickerState, silent?: boolean) {
      this.dateTo = state.date;

      // if (this.dateTo && !this.dateFrom) {
      //   this.dateFrom = new Date(Date.now());
      // }

      if (!silent) this.$emit("statechange", this.state);
    },
    dateStateChanged(from: InlineDatepickerState, to: InlineDatepickerState) {
      this.dateToStateChanged(to, true);
      this.dateFromStateChanged(from, true);
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
