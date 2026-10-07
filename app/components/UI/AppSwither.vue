<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label
    class="switcher"
    :class="modelValue ? 'checked' : 'unchecked'"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      class="switcher-checkbox"
      @change="(event) => emit('update:modelValue', (event.target as HTMLInputElement).checked)"
    />
    <div class="switcher-slider"></div>
  </label>
</template>

<style lang="scss" scoped>
.switcher {
  cursor: pointer;
  display: inline-block;
  @apply tw-relative tw-w-10 tw-h-6 tw-rounded-full tw-bg-gray-300;
  &.checked .switcher-slider {
    @apply tw-left-4 tw-bg-green-500;
  }
}
.switcher-checkbox {
  position: absolute;
  visibility: hidden;
}
.switcher-slider {
  @apply tw-absolute tw-top-0 tw-left-0 tw-w-6 tw-h-6 tw-rounded-full tw-shadow-md tw-transition-all tw-bg-red-700;
}
</style>
