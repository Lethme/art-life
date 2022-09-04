<template>
  <div :class="`intro__filter filter${expanded ? ' filter-open' : ''}`">
    <div class="filter__wrapper">
      <!--  MAIN-filter-->
      <div class="filter__main main-filter">
        <art-life-filter-dropdown
          :title="
            datesRangeText && datesRangeText.length
              ? datesRangeText
              : 'Выбрать дату'
          "
          icon="datepicker"
          dropdown-class="filter-calendar"
        >
          <art-life-filter-daterange
            :open-date="datesRange"
            @statechange="dateRangeStateChanged"
          />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="flag"
          :title="country?.name || 'Выбрать страну'"
          dropdown-class="filter-country"
        >
          <art-life-region-picker
            :countries-fetched="countriesFetched"
            v-model="country"
          />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="money"
          :title="priceRangeText || 'Выбрать бюджет'"
          dropdown-class="filter-price"
        >
          <art-life-price-picker
            id="filter-price-picker"
            v-model="priceRange"
          />
        </art-life-filter-dropdown>

        <div class="filter__item">
          <button
            @click="switchExpanded"
            class="filter__item-button filter__item-detail"
          >
            <span>Детальный фильтр</span>
            <div>
              <svg width="13" height="18" aria-hidden="true">
                <path
                  d="M0.750047 18L11.9735 9.50529C12.1503 9.37131 12.25 9.18951 12.25 8.9999C12.25 8.81023 12.1506 8.62822 11.9735 8.49451L0.75 -1.01328e-06C0.75 -1.01328e-06 6.567 5.88579 6.567 8.9999C6.567 12.1139 0.750047 18 0.750047 18Z"
                />
              </svg>
            </div>
          </button>
          <div class="filter__item-dropdown dropdown-filter" hidden></div>
        </div>
      </div>

      <!--  ADD-filter-->
      <div class="filter__add add-filter">
        <art-life-filter-dropdown
          icon="tour-icon"
          :title="tourTypeText ? tourTypeText : 'Тип тура'"
          dropdown-class="filter-tour"
        >
          <art-life-tour-type-picker
            v-model="tourTypes"
            :tour-types-fetched="tourTypesFetched"
          />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="comfort"
          :title="comfortText ? comfortText : 'Комфорт'"
        >
          <h4 class="dropdown-filter__title">Комфорт</h4>
          <art-life-rate-picker v-model="comfort" :max-rate="maxComfort" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="bike-icon"
          :title="activityText ? activityText : 'Физ. активность'"
        >
          <h4 class="dropdown-filter__title">Физ. активность</h4>
          <art-life-rate-picker v-model="activity" :max-rate="maxActivity" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          :title="sortingText ? sortingText : 'Сортировать'"
        >
          <art-life-filter-sort v-model="sortingTypes" />
        </art-life-filter-dropdown>
      </div>
    </div>

    <art-life-filter-button>Искать тур</art-life-filter-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeFilterDaterange from "../FilterDaterangeComponent";
import ArtLifeRegionPicker from "../RegionPickerComponent";
import ArtLifePricePicker from "../PricePickerComponent";
import ArtLifeRatePicker from "../RatePickerComponent";
import ArtLifeFilterButton from "../FilterButtonComponent";
import ArtLifeFilterDropdown from "../FilterDropdownComponent";
import ArtLifeFilterSort from "../FilterSortComponent";
import ArtLifeTourTypePicker from "@/components/UI/TourTypePickerComponent/TourTypePickerComponent.vue";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";
import { FilterDaterangeState } from "@/components/UI/FilterDaterangeComponent/types";
import moment from "moment";
import { getCurrencySign } from "@/components/UI/PricePickerComponent/types/Currency";
import { PricePickerState } from "@/components/UI/PricePickerComponent/types";
import CountryType from "@/api/types/CountryType";
import { TourTypePickerState } from "@/components/UI/TourTypePickerComponent/types";
import { FilterSortState } from "@/components/UI/FilterSortComponent/types";

export default defineComponent({
  name: "ArtLifeFilter",
  components: {
    ArtLifeTourTypePicker,
    ArtLifeFilterDaterange,
    ArtLifeRegionPicker,
    ArtLifePricePicker,
    ArtLifeRatePicker,
    ArtLifeFilterButton,
    ArtLifeFilterDropdown,
    ArtLifeFilterSort,
  },
  data() {
    return {
      expanded: false,
      tourTypesFetched:
        this.$store.getters.tourTypes &&
        this.$store.getters.tourTypes.length !== 0,
      countriesFetched:
        this.$store.getters.countries &&
        this.$store.getters.countries.length !== 0,
    };
  },
  computed: {
    comfort: {
      get(): number {
        return this.$store.getters.filterState.comfort;
      },
      set(value: number) {
        this.$store.dispatch("setComfort", value);
      },
    },
    activity: {
      get(): number {
        return this.$store.getters.filterState.activity;
      },
      set(value: number) {
        this.$store.dispatch("setActivity", value);
      },
    },
    priceRange: {
      get(): PricePickerState {
        return this.$store.getters.filterState.priceRange;
      },
      set(value: PricePickerState) {
        this.$store.dispatch("setPriceRange", value);
      },
    },
    country: {
      get(): CountryType {
        return this.$store.getters.filterState.country;
      },
      set(value: CountryType) {
        this.$store.dispatch("setCountry", value);
      },
    },
    datesRange: {
      get(): FilterDaterangeState {
        return this.$store.getters.filterState.datesRange;
      },
      set(value: FilterDaterangeState) {
        this.$store.dispatch("setDatesRange", value);
      },
    },
    tourTypes: {
      get(): TourTypePickerState {
        return this.$store.getters.filterState.selectedTourTypes;
      },
      set(value: TourTypePickerState) {
        this.$store.dispatch("setSelectedTourTypes", value);
      },
    },
    sortingTypes: {
      get(): FilterSortState {
        return this.$store.getters.filterState.sortingTypes;
      },
      set(value: FilterSortState) {
        this.$store.dispatch("setSortingTypes", value);
      },
    },
    datesRangeText(): string | Array<string> {
      let result: Array<string> = [];

      this.datesRange?.from
        ? result.push(moment(this.datesRange?.from).format("DD.MM.YYYY"))
        : {};

      this.datesRange?.to
        ? result.push(moment(this.datesRange?.to).format("DD.MM.YYYY"))
        : {};

      return this.$store.getters.windowWidth <= 768
        ? result.join(" - ")
        : result;
    },
    priceRangeText(): string | Array<string> {
      if (this.priceRange) {
        const min = `${this.priceRange.price.min}${getCurrencySign(
          this.priceRange.currency
        )}`;
        const max = `${this.priceRange.price.max}${getCurrencySign(
          this.priceRange.currency
        )}`;

        return this.$store.getters.windowWidth <= 768
          ? `${min} - ${max}`
          : [min, max];
      }

      return null;
    },
    tourTypeText(): string {
      if (this.tourTypes && this.tourTypes.length) {
        return `${this.tourTypes[0].name}${
          this.tourTypes.length > 1 ? "..." : ""
        }`;
      }

      return null;
    },
    comfortText(): string {
      if (this.comfort > 0) {
        return `${this.comfort}/${this.maxComfort}`;
      }

      return null;
    },
    activityText(): string {
      if (this.activity > 0) {
        return `${this.activity}/${this.maxActivity}`;
      }

      return null;
    },
    sortingText(): string {
      if (this.sortingTypes && this.sortingTypes.length) {
        const item = this.sortingTypes[0];
        return `${item.title}${this.sortingTypes.length > 1 ? "..." : ""}`;
      }

      return null;
    },
  },
  methods: {
    switchExpanded() {
      this.expanded = !this.expanded;
    },
    dateRangeStateChanged(state: FilterDaterangeState) {
      this.datesRange = state;
    },
  },
  mounted() {
    /* Yeah it's another forced thing to make dropdown animations */
    /* work after component's remount */
    const init = () => {
      const initFilterDropdown = (document as any).initFilterDropdown;

      if (initFilterDropdown) {
        initFilterDropdown();
      }
    };

    init();
    //document.addEventListener("DOMContentLoaded", init);
  },
  setup(props, context) {
    const maxComfort = 5;
    const maxActivity = 5;

    return {
      maxComfort,
      maxActivity,
    };
  },
  created() {
    EventEmitter.On(Events.TourTypesFetched, () => {
      this.tourTypesFetched = true;
    });
    EventEmitter.On(Events.CountriesFetched, () => {
      this.countriesFetched = true;
    });
  },
});
</script>

<style lang="less">
@import "FilterComponent";
</style>
