<template>
  <router-link @click="onClick" :to="to" class="product__item-button-link">
    <svg width="13" height="18" aria-hidden="true">
      <path
        d="M0.750047 18L11.9735 9.50529C12.1503 9.37131 12.25 9.18951 12.25 8.9999C12.25 8.81023 12.1506 8.62822 11.9735 8.49451L0.75 -1.01328e-06C0.75 -1.01328e-06 6.567 5.88579 6.567 8.9999C6.567 12.1139 0.750047 18 0.750047 18Z"
      />
    </svg>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ArtLifeProductLink",
  props: {
    to: {
      required: true,
      type: String as PropType<string>,
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
});
</script>

<style lang="less" scoped>
@import "ProductLinkComponent";
</style>
