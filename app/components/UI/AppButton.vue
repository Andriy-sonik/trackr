<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
  },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :class="['app-button', `app-button--${variant}`, `app-button--${size}`]"
  >
    <span
      v-if="loading"
      class="app-button__spinner"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  @apply tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-font-medium tw-transition-colors;
  @apply focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-offset-2;
  @apply disabled:tw-cursor-not-allowed disabled:tw-opacity-50;
}

.app-button--sm {
  @apply tw-min-h-8 tw-px-3 tw-text-sm;
}

.app-button--md {
  @apply tw-min-h-10 tw-px-4 tw-text-sm;
}

.app-button--lg {
  @apply tw-min-h-12 tw-px-5 tw-text-base;
}

.app-button--primary {
  @apply tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 focus-visible:tw-ring-blue-500 focus-visible:tw-ring-offset-gray-800;
}

.app-button--secondary {
  @apply tw-bg-gray-200 tw-text-gray-900 hover:tw-bg-gray-300 focus-visible:tw-ring-gray-400 focus-visible:tw-ring-offset-gray-800;
}

.app-button--ghost {
  @apply tw-bg-transparent tw-text-gray-100 hover:tw-bg-gray-700 focus-visible:tw-ring-gray-400 focus-visible:tw-ring-offset-gray-800;
}

.app-button--danger {
  @apply tw-bg-red-600 tw-text-white hover:tw-bg-red-700 focus-visible:tw-ring-red-500 focus-visible:tw-ring-offset-gray-800;
}

.app-button__spinner {
  @apply tw-h-4 tw-w-4 tw-animate-spin tw-rounded-full tw-border-2 tw-border-current tw-border-r-transparent;
}
</style>
