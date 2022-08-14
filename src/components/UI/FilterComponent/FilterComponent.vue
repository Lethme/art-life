<template>
  <div :class="`intro__filter filter${expanded ? ' filter-open' : ''}`">
    <div class="filter__wrapper">
      <!--  MAIN-filter-->
      <div class="filter__main main-filter">
        <art-life-filter-dropdown
          title="Выбрать дату"
          icon="datepicker"
          dropdown-class="filter-calendar"
        >
          <art-life-filter-datepicker />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="flag"
          title="Выберите страну"
          dropdown-class="filter-country"
        >
          <art-life-region-picker :regions="['Test', 'Test1', 'Test2']" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown
          icon="money"
          title="Выбрать бюджет"
          dropdown-class="filter-price"
        >
          <art-life-price-picker id="filter-price-picker" />
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
          <ul class="dropdown-filter__list filter-tour__list">
            <li>
              <art-life-checkbox label-text="Хиты продаж" />
            </li>
            <li>
              <art-life-checkbox label-text="Кемпы" />
            </li>
            <li>
              <art-life-checkbox label-text="Круизный яхтинг" />
            </li>
            <li>
              <art-life-checkbox label-text="Круиз на лайнере" />
            </li>
            <li>
              <art-life-checkbox label-text="Яхтенные регаты" />
            </li>
            <li>
              <art-life-checkbox label-text="ЗОЖ-туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Спортивные туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Хиты продаж" />
            </li>
            <li>
              <art-life-checkbox label-text="Лечебно-оздоровительные туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Бизнес туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Авторские туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Духовные туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Гастрономические туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Нетворкинг туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Развлекательные туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Музыкальные туры" />
            </li>
            <li>
              <art-life-checkbox label-text="Экслюзивные отели" />
            </li>
          </ul>
        </art-life-filter-dropdown>

        <art-life-filter-dropdown icon="comfort" title="Комфорт">
          <h4 class="dropdown-filter__title">Комфорт</h4>
          <art-life-rate-picker :max-rate="5" />
        </art-life-filter-dropdown>

        <art-life-filter-dropdown icon="bike-icon" title="Физ. активность">
          <h4 class="dropdown-filter__title">Физ. активность</h4>
          <art-life-rate-picker :max-rate="5" />
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
import ArtLifeFilterDatepicker from "../FilterDatepickerComponent";
import ArtLifeRegionPicker from "../RegionPickerComponent";
import ArtLifePricePicker from "../PricePickerComponent";
import ArtLifeRatePicker from "../RatePickerComponent";
import ArtLifeCheckbox from "../CheckboxComponent";
import ArtLifeFilterButton from "../FilterButtonComponent";
import ArtLifeFilterDropdown from "../FilterDropdownComponent";

export default defineComponent({
  name: "ArtLifeFilter",
  components: {
    ArtLifeFilterDatepicker,
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
    };
  },
  methods: {
    switchExpanded() {
      this.expanded = !this.expanded;
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
});
</script>

<style lang="less">
@import "FilterComponent";
</style>
