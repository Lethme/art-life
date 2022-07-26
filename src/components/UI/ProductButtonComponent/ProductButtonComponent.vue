<template>
  <button @click="onClick" type="button" class="product__item-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeProductButton",
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
});
</script>

<style lang="less" scoped>
@import "ProductButtonComponent";
</style>
