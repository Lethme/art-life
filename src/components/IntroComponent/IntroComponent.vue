<template>
  <section class="intro">
    <div class="intro__container">
      <h1 class="title intro__title">
        Найди путешествия и&nbsp;туры в&nbsp;компании новых людей
      </h1>
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeIntro",
});
</script>

<style lang="less" scoped>
@import "IntroComponent";
</style>
