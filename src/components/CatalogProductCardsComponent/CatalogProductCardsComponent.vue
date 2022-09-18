<template>
  <section v-if="toursAvailable" class="section my-mb-7">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title px-3">{{ title }}</h2>
      </div>
      <div
        v-if="products && products.length"
        class="section__cards d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-sm-start"
      >
        <art-life-product-card
          class="d-inline-flex col-6 col-md-4 col-lg-3 px-2 py-4"
          v-for="product in products"
          :key="product.title"
          :imageSource="product.imageSource"
          :title="product.title"
          :description="product.description"
          :dates="product.dates"
          :price="product.price"
          :linkUrl="product.linkUrl"
          :swiper-slide="false"
        />
        <art-life-product-card-skeleton
          v-for="i in loadMoreSkeletonsCount"
          :key="i"
          class="skeleton d-inline-flex col-6 col-md-4 col-lg-3 px-2 py-4"
          :swiper-slide="false"
        />
      </div>
      <div
        v-else
        class="section__cards d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-sm-start"
      >
        <art-life-product-card-skeleton
          v-for="i in perPage"
          :key="i"
          class="skeleton d-inline-flex col-6 col-md-4 col-lg-3 px-2 py-4"
          :swiper-slide="false"
        />
      </div>
    </div>
    <div
      v-if="showLoadMoreBtn"
      class="section__btn d-flex justify-content-center pt-4"
    >
      <art-life-filter-button @search="loadMore">
        Загрузить ещё
      </art-life-filter-button>
    </div>
  </section>
  <section v-else class="section my-mb-7">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title px-3">
          Туров по заданным критериям не найдено
        </h2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductCard } from "@/components/ProductCardComponent/types";
import ArtLifeProductCard from "@/components/ProductCardComponent/ProductCardComponent.vue";
import ArtLifeFilterButton from "@/components/UI/FilterButtonComponent/FilterButtonComponent.vue";
import ArtLifeProductCardSkeleton from "@/components/ProductCardComponent/skeleton/ProductCardSkeletonComponent.vue";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";

export default defineComponent({
  name: "ArtLifeCatalogProductCards",
  components: {
    ArtLifeProductCardSkeleton,
    ArtLifeFilterButton,
    ArtLifeProductCard,
  },
  data() {
    return {
      loadMoreSkeletonsCount: 0,
    };
  },
  props: {
    title: {
      required: true,
      type: String as () => string,
    },
    products: {
      required: true,
      type: Array as PropType<ProductCard[]>,
      default() {
        return [];
      },
    },
    showLoadMoreBtn: {
      required: false,
      type: Boolean as PropType<boolean>,
      default() {
        return true;
      },
    },
    toursAvailable: {
      required: false,
      type: Boolean as PropType<boolean>,
      default() {
        return true;
      },
    },
    perPage: {
      required: false,
      type: Number as PropType<number>,
      default() {
        return 10;
      },
    },
  },
  mounted() {
    EventEmitter.On(Events.CatalogToursFetching, (count) => {
      this.loadMoreSkeletonsCount = count;
    });

    EventEmitter.On(Events.CatalogToursFetched, () => {
      this.loadMoreSkeletonsCount = 0;
    });
  },
  unmounted() {
    EventEmitter.Off(Events.CatalogToursFetching, Events.CatalogToursFetched);
  },
  methods: {
    loadMore() {
      this.$emit("loadMore");
    },
  },
});
</script>

<style lang="less">
@import "CatalogProductCardsComponent";
</style>
