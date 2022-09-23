<template>
  <div class="catalog">
    <art-life-header />
    <art-life-intro>
      <art-life-filter @search="search" />
    </art-life-intro>
    <art-life-catalog-product-cards
      title="Хиты продаж"
      :products="tours"
      :show-load-more-btn="!fullyLoaded"
      :per-page="perPage"
      :tours-available="toursAvailable"
      @loadMore="loadMore"
    />
    <art-life-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeHeader from "@/components/HeaderComponent/HeaderComponent.vue";
import ArtLifeIntro from "@/components/IntroComponent/IntroComponent.vue";
import ArtLifeFilter from "@/components/UI/FilterComponent/FilterComponent.vue";
import ArtLifeFooter from "@/components/FooterComponent/FooterComponent.vue";
import FilterQuery from "@/api/types/FilterQuery";
import { ToursService } from "@/api/services";
import { FilterState } from "@/store/modules/filter/state";
import { ProductCard } from "@/components/ProductCardComponent/types";
import ArtLifeCatalogProductCards from "@/components/CatalogProductCardsComponent/CatalogProductCardsComponent.vue";
import { getProductCardFromTour } from "@/api/types/Tour";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";

export default defineComponent({
  components: {
    ArtLifeCatalogProductCards,
    ArtLifeFooter,
    ArtLifeFilter,
    ArtLifeIntro,
    ArtLifeHeader,
  },
  data() {
    return {
      tours: new Array<ProductCard>(),
      currentPage: 1,
      lastPage: undefined,
      total: undefined,
      toursAvailable: true,
    };
  },
  setup(props, context) {
    const perPage = 10;
    return { perPage };
  },
  computed: {
    fullyLoaded() {
      return !(this.currentPage < this.lastPage);
    },
  },
  mounted() {
    this.$store.dispatch("fetchTourTypes");
    this.$store.dispatch("fetchCountries");
    this.$store.dispatch("fetchPrice");

    ToursService.GetTours({
      per_page: this.perPage,
      ...this.$route.query,
    }).then((response) => {
      if (!response.data || !response.data.length) {
        this.toursAvailable = false;
        this.$router.push({
          name: "error",
          params: {
            code: "404",
            message: "Туры не найдены",
          },
        });
      } else {
        this.toursAvailable = true;
      }

      this.tours = response.data.map((tour) => getProductCardFromTour(tour));
      this.lastPage = response.meta?.last_page;
      this.total = response.meta?.total;
    });
  },
  methods: {
    search(filterState: FilterState, filterQuery: FilterQuery) {
      this.tours = [];
      this.$router.push({
        query: filterQuery as any,
      });
      ToursService.GetTours({
        per_page: this.perPage,
        ...this.$route.query,
      }).then((response) => {
        if (!response.data || !response.data.length) {
          this.toursAvailable = false;
          this.$router.push({
            name: "error",
            params: {
              code: "404",
              message: "Туры не найдены",
            },
          });
        } else {
          this.toursAvailable = true;
        }

        this.tours = response.data.map((tour) => getProductCardFromTour(tour));
        this.lastPage = response.meta?.last_page;
        this.total = response.meta?.total;
      });
    },
    loadMore() {
      this.currentPage += 1;

      const remainingToursCount =
        this.total - (this.currentPage - 1) * this.perPage;
      const skeletonsCount =
        remainingToursCount < this.perPage ? remainingToursCount : this.perPage;

      EventEmitter.Emit(Events.CatalogToursFetching, skeletonsCount);

      ToursService.GetTours({
        page: this.currentPage,
        per_page: this.perPage,
        ...this.$route.query,
      }).then((response) => {
        EventEmitter.Emit(Events.CatalogToursFetched);
        this.tours = [
          ...this.tours,
          ...response.data.map((tour) => getProductCardFromTour(tour)),
        ];
        this.lastPage = response.meta?.last_page;
        this.total = response.meta?.total;
      });
    },
  },
});
</script>

<style lang="less"></style>
