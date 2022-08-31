<template>
  <div class="product swiper">
    <div class="product__wrapper swiper-wrapper">
      <art-life-product-card-skeleton v-for="i in 5" :key="i" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeProductCardSkeleton from "@/components/ProductCardComponent/skeleton/ProductCardSkeletonComponent.vue";
import initSliders, {
  removeInitSlidersListener,
} from "@/components/ProductCardSliderComponent/init";

export default defineComponent({
  name: "ArtLifeProductCardSliderSkeleton",
  components: { ArtLifeProductCardSkeleton },
  mounted() {
    initSliders(this);
  },
  beforeUnmount() {
    removeInitSlidersListener(this);
  },
});
</script>

<style lang="less" scoped>
@import "../ProductCardSliderComponent";
</style>
