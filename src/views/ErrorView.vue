<template>
  <section class="error">
    <art-life-header />
    <art-life-intro>
      <art-life-filter @search="search" />
    </art-life-intro>
    <div class="message-wrapper">
      <div class="message-wrapper-inner">
        <div class="code">
          <h1>{{ code }}</h1>
        </div>
        <div class="message">
          <h2>{{ message }}</h2>
        </div>
        <div class="link">
          <art-life-filter-button @search="goMain">
            На главную
          </art-life-filter-button>
        </div>
      </div>
    </div>
    <art-life-footer />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ArtLifeFilterButton from "@/components/UI/FilterButtonComponent/FilterButtonComponent.vue";
import ArtLifeHeader from "@/components/HeaderComponent/HeaderComponent.vue";
import ArtLifeFooter from "@/components/FooterComponent/FooterComponent.vue";
import ArtLifeIntro from "@/components/IntroComponent/IntroComponent.vue";
import ArtLifeFilter from "@/components/UI/FilterComponent/FilterComponent.vue";
import { FilterState } from "@/store/modules/filter/state";
import FilterQuery from "@/api/types/FilterQuery";

export default defineComponent({
  name: "ErrorView",
  components: {
    ArtLifeFilter,
    ArtLifeIntro,
    ArtLifeFooter,
    ArtLifeHeader,
    ArtLifeFilterButton,
  },
  props: {
    code: {
      required: false,
      type: String as PropType<string>,
      default() {
        return "404";
      },
    },
    message: {
      required: false,
      type: String as PropType<string>,
      default() {
        return "Страница не найдена";
      },
    },
  },
  mounted() {
    this.$store.dispatch("fetchTourTypes");
    this.$store.dispatch("fetchCountries");
    this.$store.dispatch("fetchPrice");
  },
  methods: {
    goMain() {
      this.$router.push({
        path: "/",
      });
    },
    search(filterState: FilterState, filterQuery: FilterQuery) {
      this.$router.push({
        path: "/catalog",
        query: filterQuery as any,
      });
    },
  },
});
</script>

<style lang="less" scoped>
.error {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .message-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 6em;

    .message-wrapper-inner {
      text-align: center;
      padding: 3em 4em;
      border: 1px solid #e6e6e677;
      box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.1);
      width: auto;

      .media-lt(576px, {
        padding: 2em 3em;
      });
      .media-lt(400px, {
        padding: 1.5em 2em;
      });

      .code {
        font-size: 60px;

        .media-lt(576px, {
          font-size: 40px;
        });
        .media-lt(400px, {
          font-size: 30px;
        });
      }

      .message {
        font-size: 30px;

        .media-lt(576px, {
          font-size: 20px;
        });
        .media-lt(400px, {
          font-size: 15px;
        });
      }

      .link {
        margin-top: 2em;

        .media-lt(576px, {
          margin-top: 1em;

          .filter__button {
            font-size: 14px;
            padding: 0.7em 2.5em;
          }
        });

        .media-lt(400px, {
          margin-top: 0.5em;

          .filter__button {
            font-size: 14px;
            padding: 0.5em 2em;
          }
        });
      }
    }
  }
}
</style>
