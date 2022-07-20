<template>
  <div class="home">
    <art-life-header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifeHeader from "@/components/HeaderComponent";

export default defineComponent({
  name: "HomeView",
  components: {
    ArtLifeHeader,
  },
});
</script>
