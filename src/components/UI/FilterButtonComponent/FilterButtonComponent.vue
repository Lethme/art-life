<template>
  <button key="filterBtn" @click.stop="onClick" class="filter__button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeFilterButton",
  methods: {
    onClick() {
      this.$emit("search");
    },
  },
});
</script>

<style lang="less" scoped>
@import "FilterButtonComponent";
</style>
