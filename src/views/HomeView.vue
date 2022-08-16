<template>
  <div class="home">
    <art-life-header />
    <art-life-intro>
      <art-life-filter />
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
      // products: Array(10).fill({
      //   imageSource: "charter/01",
      //   title: "Путешествие в Кению",
      //   description:
      //     "Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!",
      //   dates: "5 марта - 9 марта",
      //   price: "12 500$",
      //   linkUrl: "/test",
      // }),
      // products_1: Array(10).fill({
      //   imageSource: "hits/01",
      //   title: "Путешествие в Кению",
      //   description:
      //     "Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!",
      //   dates: "5 марта - 9 марта",
      //   price: "12 500$",
      //   linkUrl: "/test",
      // }),
    };
  },
  created() {
    EventEmitter.On(Events.TourTypesFetched, () => {
      if (this.$store.getters.tourTypes.length) {
        ToursService.GetToursByTypeId(this.$store.getters.tourTypes[0].id, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.popularTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeId(this.$store.getters.tourTypes[1].id, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.yachtTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeId(this.$store.getters.tourTypes[2].id, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.cruiseTours = tours.map((tour) => getProductCardFromTour(tour));
        });

        ToursService.GetToursByTypeId(this.$store.getters.tourTypes[3].id, {
          per_page: 10,
          page: 1,
        }).then((tours) => {
          this.yachtRent = tours.map((tour) => getProductCardFromTour(tour));
        });
      }
    });
  },
  mounted() {
    if (this.$store.getters.tourTypes.length) {
      EventEmitter.Emit(Events.TourTypesFetched);
    }
  },
  unmounted() {
    EventEmitter.Off(Events.TourTypesFetched, Events.CountriesFetched);
  },
});
</script>
