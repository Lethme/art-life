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
          title="Тип тура"
          dropdown-class="filter-tour"
        >
          <art-life-tour-type-picker
            v-model="tourTypes"
            :tour-types-fetched="tourTypesFetched"
          />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown icon="comfort" title="Комфорт">
          <h4 class="dropdown-filter__title">Комфорт</h4>
          <art-life-rate-picker v-model="comfort" :max-rate="5" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown icon="bike-icon" title="Физ. активность">
          <h4 class="dropdown-filter__title">Физ. активность</h4>
          <art-life-rate-picker v-model="activity" :max-rate="5" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown title="Сортировать">
          <ul class="dropdown-filter__list">
            <li>
              <art-life-checkbox label-text="По убыванию цены" />
            </li>
            <li>
              <art-life-checkbox label-text="По возрастанию цены" />
            </li>
            <li>
              <art-life-checkbox label-text="По ближайшим датам" />
            </li>
            <li>
              <art-life-checkbox label-text="По популярности" />
            </li>
          </ul>
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
import ArtLifeCheckbox from "../CheckboxComponent";
import ArtLifeFilterButton from "../FilterButtonComponent";
import ArtLifeFilterDropdown from "../FilterDropdownComponent";
import ArtLifeTourTypePicker from "@/components/UI/TourTypePickerComponent/TourTypePickerComponent.vue";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";
import { FilterDaterangeState } from "@/components/UI/FilterDaterangeComponent/types";
import moment from "moment";
import CountryType from "@/api/types/CountryType";
import { Currency } from "@/components/UI/PricePickerComponent/types";
import { getCurrencySign } from "@/components/UI/PricePickerComponent/types/Currency";

export default defineComponent({
  name: "ArtLifeFilter",
  components: {
    ArtLifeTourTypePicker,
    ArtLifeFilterDaterange,
    ArtLifeRegionPicker,
    ArtLifePricePicker,
    ArtLifeRatePicker,
    ArtLifeCheckbox,
    ArtLifeFilterButton,
    ArtLifeFilterDropdown,
  },
  data() {
    return {
      expanded: false,
      tourTypesFetched: this.$store.getters.tourTypes.length !== 0,
      countriesFetched: this.$store.getters.countries.length !== 0,
      tourTypes: [],
      datesRange: null,
      country: null,
      priceRange: null,
      comfort: 1,
      activity: 1,
    };
  },
  computed: {
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
