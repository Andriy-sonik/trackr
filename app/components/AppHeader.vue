<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__logo">TRAKER</div>
    <AppButton
      variant="secondary"
      size="md"
      type="button"
    >
      Loggin
    </AppButton>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply tw-flex tw-justify-between tw-items-center tw-p-2 tw-text-white tw-border-b tw-border-gray-700 tw-bg-gray-800;
}
</style>
