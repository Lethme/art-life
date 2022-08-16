<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <art-life-placeholder width="18px" height="18px" border-radius="5px" />
      <span class="checkbox__text">
        <art-life-placeholder width="160px" height="18px" border-radius="3px" />
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtLifePlaceholder from "@/components/UI/PlaceholderComponent/PlaceholderComponent.vue";

export default defineComponent({
  name: "ArtLifeCheckboxSkeleton",
  components: { ArtLifePlaceholder },
});
</script>

<style lang="less" scoped>
@import "../CheckboxComponent";
</style>
