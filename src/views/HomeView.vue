<template>
  <div class="home">
    <art-life-header />
    <art-life-intro>
      <art-life-filter />
    </art-life-intro>
    <art-life-slider-section
      title="Хиты продаж"
      :products="products_1"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Яхтенные круизы"
      :products="products"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Круизы"
      :products="products"
    ></art-life-slider-section>
    <art-life-slider-section
      title="Яхтенные круизы"
      :products="products"
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
      products: Array(10).fill({
        imageSource: "charter/01",
        title: "Путешествие в Кению",
        description:
          "Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!",
        dates: "5 марта - 9 марта",
        price: "12 500$",
        linkUrl: "/test",
      }),
      products_1: Array(10).fill({
        imageSource: "hits/01",
        title: "Путешествие в Кению",
        description:
          "Позавтракаем с жирафами, увидим диких кошек на вечернем сафари и встретим восход солнца в саванне на воздушном шаре!",
        dates: "5 марта - 9 марта",
        price: "12 500$",
        linkUrl: "/test",
      }),
    };
  },
});
</script>
