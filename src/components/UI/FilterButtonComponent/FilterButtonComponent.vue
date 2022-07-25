<template>
  <button type="submit" class="filter__button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeFilterButton",
});
</script>

<style lang="less" scoped>
@import "FilterButtonComponent";
</style>
