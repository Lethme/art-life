<template>
  <div
    v-click-out-side="hide"
    :class="`filter__item${!hidden ? ' filter__item-open' : ''}`"
  >
    <button
      @click="switchHidden"
      type="button"
      class="filter__item-button button-js"
    >
      <object
        v-if="icon"
        class="filter__item-icon"
        type="image/svg+xml"
        :data="require(`@/assets/img/icons/${icon}.svg`)"
        width="21"
        height="18"
        aria-hidden="true"
      >
        <!--  <img src="SvgImg.png" width="200" height="200" alt="image format png" />-->
      </object>
      <span v-html="titleText" class="filter__item-text icon-arrow-down" />
    </button>
    <div
      v-if="hidden"
      :class="`filter__item-dropdown dropdown-filter${
        dropdownClass ? ' ' + dropdownClass : ''
      }`"
      hidden
    >
      <!--      <slot v-if="!hidden"></slot>-->
    </div>
    <div
      v-else
      :class="`filter__item-dropdown dropdown-filter${
        dropdownClass ? ' ' + dropdownClass : ''
      }`"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import clickOutSide from "@mahdikhashan/vue3-click-outside";

export default defineComponent({
  name: "ArtLifeFilterDropdown",
  directives: {
    clickOutSide,
  },
  props: {
    title: {
      required: true,
      type: [String, Array],
    },
    icon: {
      required: false,
      type: String as () => string,
    },
    dropdownClass: {
      required: false,
      type: String as () => string,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {
      hidden: true,
    };
  },
  computed: {
    titleText() {
      if (Array.isArray(this.title)) {
        // if (this.$store.getters.windowSize.width <= 768) {
        //   return this.title.join(" - ");
        // }

        return this.title.join("<br>");
      }

      return this.title;
    },
  },
  methods: {
    switchHidden() {
      this.hidden = !this.hidden;
    },
    hide() {
      this.hidden = true;
    },
  },
});
</script>

<style lang="less">
@import "FilterDropdownComponent";
</style>
