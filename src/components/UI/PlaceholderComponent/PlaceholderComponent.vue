<template>
  <div class="placeholder">&nbsp;</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArtLifePlaceholder",
  props: {
    height: {
      type: String,
      default() {
        return "100%";
      },
    },
    width: {
      type: String,
      default() {
        return "100%";
      },
    },
    borderRadius: {
      type: String,
      default() {
        return "unset";
      },
    },
    margin: {
      type: String,
      default() {
        return "unset";
      },
    },
    padding: {
      type: String,
      default() {
        return "unset";
      },
    },
  },
});
</script>

<style lang="less" scoped>
@keyframes bgAnimation {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  margin: v-bind(margin);
  padding: v-bind(padding);
  border-radius: v-bind(borderRadius);
  background-image: linear-gradient(
    to right,
    #d6d7d8 0%,
    #e2e3e4 10%,
    #d6d7d8 20%,
    #d6d7d8 100%
  );
  background-size: 200% 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: bgAnimation 1.2s linear infinite;
}
</style>
