<template>
  <div class="home">
    <art-life-header />
    <art-life-intro>
      <art-life-filter @search="search" />
    </art-life-intro>
    <art-life-slider-section
      title="Хиты продаж"
      :products="popularTours"
      :skeleton="!popularTours.length"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Яхтенные круизы"
      :products="yachtTours"
      :skeleton="!yachtTours.length"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Круизы"
      :products="cruiseTours"
      :skeleton="!cruiseTours.length"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Аренда Яхт"
      :products="yachtRent"
      :skeleton="!yachtRent.length"
    ></art-life-slider-section>
    <art-life-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeFooter from "@/components/FooterComponent";
import ArtLifeIntro from "@/components/IntroComponent";
import UI from "@/components/UI";
import ArtLifeHeader from "@/components/HeaderComponent";
import ArtLifeSliderSection from "@/components/SliderSectionComponent";
import ToursService from "@/api/services/ToursService";
import { getProductCardFromTour } from "@/api/types/Tour";
import { ProductCard } from "@/components/ProductCardComponent/types";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";
import { FilterState } from "@/store/modules/filter/state";
import { getRequestQuery } from "@/api/services/utils";
import FilterQuery from "@/api/types/FilterQuery";

export default defineComponent({
  name: "HomeView",
  components: {
    ...UI,
    ArtLifeHeader,
    ArtLifeFooter,
    ArtLifeIntro,
    ArtLifeSliderSection,
  },
  data() {
    return {
      popularTours: new Array<ProductCard>(),
      yachtTours: new Array<ProductCard>(),
      cruiseTours: new Array<ProductCard>(),
      yachtRent: new Array<ProductCard>(),
    };
  },
  methods: {
    search(filterState: FilterState, filterQuery: FilterQuery) {
      this.$router.push({
        path: "/catalog",
        query: filterQuery as any,
      });
    },
  },
  mounted() {
    this.$store.dispatch("fetchTourTypes");
    this.$store.dispatch("fetchCountries");
    this.$store.dispatch("fetchPrice");

    EventEmitter.On(Events.TourTypesFetched, () => {
      if (
        this.$store.getters.tourTypes &&
        this.$store.getters.tourTypes.length
      ) {
        ToursService.GetToursByTypeName(this.$store.getters.tourTypes[0].name, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.popularTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeName(this.$store.getters.tourTypes[1].name, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.yachtTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeName(this.$store.getters.tourTypes[2].name, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.cruiseTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeName(this.$store.getters.tourTypes[3].name, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.yachtRent = tours.map((tour) => getProductCardFromTour(tour));
        });
      }
    });

    if (this.$store.getters.tourTypes && this.$store.getters.tourTypes.length) {
      EventEmitter.Emit(Events.TourTypesFetched);
    }
  },
  unmounted() {
    EventEmitter.Off(Events.TourTypesFetched, Events.CountriesFetched);
  },
});
</script>
