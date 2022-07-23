<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="checkedState"
        @change="switchState"
      />
      <span class="checkbox__control icon-check"></span>
      <span class="checkbox__text">{{ labelText }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CheckboxState } from "@/components/UI/CheckboxComponent/types";

export default defineComponent({
  name: "ArtLifeCheckbox",
  props: {
    labelText: {
      required: true,
      type: String as PropType<string>,
    },
    checked: {
      required: false,
      type: Boolean as PropType<boolean>,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      checkedState: this.checked,
    };
  },
  computed: {
    state(): CheckboxState {
      return {
        checked: this.checkedState,
      };
    },
  },
  methods: {
    switchState() {
      this.checkedState = !this.checkedState;
      this.$emit("statechange", this.state);
    },
  },
});
</script>

<style lang="less">
@import "CheckboxComponent";
</style>
