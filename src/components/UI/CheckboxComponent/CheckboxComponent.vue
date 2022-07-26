<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="modelValue"
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
    modelValue: {
      required: false,
      type: Boolean as PropType<boolean>,
      default() {
        return false;
      },
    },
  },
  methods: {
    switchState() {
      this.$emit("update:modelValue", !this.modelValue);
      this.$emit("statechange", !this.modelValue);
    },
  },
});
</script>

<style lang="less" scoped>
@import "CheckboxComponent";
</style>
