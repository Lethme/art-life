<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="modelValue ?? checkedState"
        @change="switchState"
      />
      <span class="checkbox__control icon-check"></span>
      <span class="checkbox__text">{{ labelText }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
        return undefined;
      },
    },
  },
  data() {
    return {
      checkedState: false,
    };
  },
  created() {
    if (this.modelValue !== undefined) {
      this.checkedState = this.modelValue;
    }
  },
  methods: {
    switchState() {
      this.checkedState = !this.checkedState;
      this.$emit("update:modelValue", this.checkedState);
      this.$emit("statechange", this.checkedState);
    },
  },
});
</script>

<style lang="less" scoped>
@import "CheckboxComponent";
</style>
