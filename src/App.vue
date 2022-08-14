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
    this.$store.dispatch("fetchTourTypes").then(() => {
      EventEmitter.Emit(Events.TourTypesFetched);
    });
  },
});
</script>

<style lang="less"></style>
