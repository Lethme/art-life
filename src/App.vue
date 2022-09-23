<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";

export default defineComponent({
  created() {
    /* eslint-disable */
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    async onWindowResize(event) {
      await this.$store.dispatch("setWindowWidth");
      await this.$store.dispatch("setWindowHeight");
    },
  },
});
</script>

<style lang="less"></style>
