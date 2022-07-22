<template>
  <button type="button" class="product__item-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeProductButton",
});
</script>

<style lang="less">
@import "ProductButtonComponent";
</style>
