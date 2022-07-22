<template>
  <div class="product swiper">
    <div class="product__wrapper swiper-wrapper">
      <art-life-product-card
        v-for="product in products"
        :key="product.title"
        :imageSource="product.imageSource"
        :title="product.title"
        :description="product.description"
        :dates="product.dates"
        :price="product.price"
        :linkUrl="product.linkUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductCard } from "@/components/ProductCardComponent/types";
import ArtLifeProductCard from "../ProductCardComponent";

export default defineComponent({
  name: "ArtLifeProductCardSlider",
  components: { ArtLifeProductCard },
  props: {
    products: {
      required: true,
      type: Array as PropType<ProductCard[]>,
      default() {
        return [];
      },
    },
  },
  mounted() {
    /* That was forced 'cause sliders would work only on a first time page is loaded */
    /* Check /public/js/apps.js for document.initSliders */
    const init = (document as any).initSliders;
    init && init();
  },
});
</script>

<style lang="less">
@import "ProductCardSliderComponent";
</style>
