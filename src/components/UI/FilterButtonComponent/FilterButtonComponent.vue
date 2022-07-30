<template>
  <button @click="onClick" type="submit" class="filter__button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifeFilterButton",
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
});
</script>

<style lang="less" scoped>
@import "FilterButtonComponent";
</style>
