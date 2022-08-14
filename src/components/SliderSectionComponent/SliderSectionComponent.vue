<template>
  <section class="section my-mb-7">
    <div class="section__container">
      <div v-if="title" class="section__head">
        <h2 class="section__title">{{ title }}</h2>
        <art-life-swipe-hint />
      </div>
      <art-life-product-card-slider v-if="!skeleton" :products="products" />
      <art-life-product-card-slider-skeleton v-else />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ArtLifeSwipeHint from "@/components/UI/SwipeHintComponent";
import ArtLifeProductCardSlider from "@/components/ProductCardSliderComponent";
import { ProductCard } from "@/components/ProductCardComponent/types";
import ArtLifeProductCardSliderSkeleton from "@/components/ProductCardSliderComponent/skeleton/ProductCardSliderSkeletonComponent.vue";

export default defineComponent({
  name: "ArtLifeSliderSection",
  components: {
    ArtLifeProductCardSliderSkeleton,
    ArtLifeSwipeHint,
    ArtLifeProductCardSlider,
  },
  props: {
    title: {
      required: true,
      type: String as () => string,
    },
    products: {
      required: false,
      type: Array as () => ProductCard[],
      default() {
        return [];
      },
    },
    skeleton: {
      type: Boolean,
    },
  },
});
</script>

<style lang="less" scoped>
@import "SliderSectionComponent";
</style>
