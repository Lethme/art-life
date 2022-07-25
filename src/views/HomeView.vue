<template>
  <div class="home">
    <art-life-product-card-slider :products="products" />
    <art-life-rate-picker :maxRate="5" @ratechange="onRateChanged" />
    <art-life-rate-picker :maxRate="10" @ratechange="onRateChanged" />
    <art-life-checkbox labelText="123" @statechange="onCheckboxStateChanged" />
    <art-life-price-picker
      id="price-picker"
      :min="-100"
      :max="100"
      @statechange="onPricePickerStateChanged"
    />
    <art-life-region-picker
      :regions="regions"
      @statechange="onRegionPickerStateChanged"
    />
    <art-life-inline-datepicker
      :from="new Date(Date.now())"
      lang="ru"
      @statechange="onDatepickerStateChanged"
      v-model="date"
    />
    <art-life-filter-datepicker @statechange="onFilterDatepickerStateChanged" />
    <art-life-footer />
    <!--    <art-life-header />-->
    <!--    <art-life-action-button type="log" image="user-icon">-->
    <!--      Зарегистрироваться-->
    <!--    </art-life-action-button>-->
    <!--    <art-life-filter-button>Искать тур</art-life-filter-button>-->
    <!--    <art-life-product-button>Оставить заявку</art-life-product-button>-->
    <!--    <art-life-product-link to="/"></art-life-product-link>-->
    <!--    <art-life-swipe-hint />-->
    <!--    <art-life-product-card-->
    <!--      imageSource="charter/01"-->
    <!--      title="Путешествие в Кению"-->
    <!--      description="Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!"-->
    <!--      dates="5 марта - 9 марта"-->
    <!--      price="12 500$"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeProductCardSlider from "@/components/ProductCardSliderComponent";
import ArtLifeFooter from "@/components/FooterComponent";
import UI from "@/components/UI";
import { PricePickerState } from "@/components/UI/PricePickerComponent/types";
import { RatePickerState } from "@/components/UI/RatePickerComponent/types";
import { CheckboxState } from "@/components/UI/CheckboxComponent/types";
import { RegionPickerState } from "@/components/UI/RegionPickerComponent/types";
import { InlineDatepickerState } from "@/components/UI/InlineDatepickerComponent/types";
import { FilterDatepickerState } from "@/components/UI/FilterDatepickerComponent/types";

export default defineComponent({
  name: "HomeView",
  components: {
    ...UI,
    ArtLifeProductCardSlider,
    ArtLifeFooter,
  },
  data() {
    return {
      products: Array(10).fill({
        imageSource: "charter/01",
        title: "Путешествие в Кению",
        description:
          "Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!",
        dates: "5 марта - 9 марта",
        price: "12 500$",
        linkUrl: "/test",
      }),
      regions: ["Албания", "Анталия", "Аргентина"],
      date: undefined,
      checked: true,
      dates: {
        from: new Date(Date.now()),
        to: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000),
      },
    };
  },
  methods: {
    onRateChanged(state: RatePickerState) {
      console.log(state);
    },
    onCheckboxStateChanged(state: CheckboxState) {
      console.log(state);
    },
    onPricePickerStateChanged(state: PricePickerState) {
      console.log(state);
    },
    onRegionPickerStateChanged(state: RegionPickerState) {
      console.log(state);
    },
    onDatepickerStateChanged(state: InlineDatepickerState) {
      console.log(state);
    },
    onFilterDatepickerStateChanged(state: FilterDatepickerState) {
      console.log(state);
    },
  },
});
</script>
