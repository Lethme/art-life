<template>
  <div class="product__item swiper-slide">
    <div class="product__item-img">
      <art-life-placeholder width="270px" height="200px" border-radius="10px" />
    </div>

    <div class="product__item-body">
      <h4 class="product__item-title">
        <art-life-placeholder width="50%" height="auto" border-radius="4px" />
      </h4>
      <p class="product__item-desc">
        <art-life-placeholder width="100%" height="15px" border-radius="6px" />
        <art-life-placeholder width="100%" height="15px" border-radius="6px" />
        <art-life-placeholder width="100%" height="15px" border-radius="6px" />
        <art-life-placeholder width="100%" height="15px" border-radius="6px" />
      </p>
      <time class="product__item-time">
        <art-life-placeholder
          width="25px"
          height="20px"
          border-radius="2px"
          margin="0 10px 0 0"
        />
        <art-life-placeholder width="60%" height="20px" border-radius="4px" />
      </time>
      <div class="product__item-price">
        <art-life-placeholder width="60px" height="auto" border-radius="4px" />
      </div>
      <div class="product__item-button-wrapper">
        <art-life-placeholder
          width="70%"
          height="50px"
          border-radius="50px"
          margin="0 12px 0 0"
        />
        <art-life-placeholder width="50px" height="50px" border-radius="50%" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifePlaceholder from "@/components/UI/PlaceholderComponent/PlaceholderComponent.vue";

export default defineComponent({
  name: "ArtLifeProductCardSkeleton",
  components: { ArtLifePlaceholder },
});
</script>

<style lang="less" scoped>
@import "../ProductCardComponent";

.product__item {
  .product__item-body {
    padding-bottom: 5px;
  }
  .product__item-img {
    margin-bottom: 1.25rem;
    padding-bottom: 0;
  }
  .product__item-desc {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
