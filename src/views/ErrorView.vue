<template>
  <section class="error">
    <div class="message-wrapper">
      <div class="code">
        <h1>{{ code }}</h1>
      </div>
      <div class="message">
        <h2>{{ message }}</h2>
      </div>
      <div class="link">
        <art-life-filter-button @search="goMain"
          >На главную</art-life-filter-button
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ArtLifeFilterButton from "@/components/UI/FilterButtonComponent/FilterButtonComponent.vue";

export default defineComponent({
  name: "ErrorView",
  components: { ArtLifeFilterButton },
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
  methods: {
    goMain() {
      this.$router.push({
        path: "/",
      });
    },
  },
});
</script>

<style lang="less" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .message-wrapper {
    text-align: center;
    padding: 3em 4em;
    border: 1px solid #e6e6e677;
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.1);

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
</style>
