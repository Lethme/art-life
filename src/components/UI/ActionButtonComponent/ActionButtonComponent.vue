<template>
  <button
    @click="onClick"
    type="button"
    :class="'action__button action__button-' + type"
  >
    <slot></slot>
    <i v-if="image" class="action__button-icon">
      <picture>
        <source
          :srcset="require(`@/assets/img/icons/${image}.webp`)"
          type="image/webp"
        />
        <img :src="require(`@/assets/img/icons/${image}.png`)" alt="" />
      </picture>
    </i>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ArtLifeActionButton",
  props: {
    type: {
      required: false,
      type: String as PropType<"reg" | "log">,
      default() {
        return "reg";
      },
    },
    image: {
      required: false,
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
@import "ActionButtonComponent";
</style>
