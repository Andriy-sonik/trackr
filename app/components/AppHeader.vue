<script setup lang="ts">
import { ROUTES } from '~/constants/index.ts'
</script>

<template>
  <header class="header">
    <NuxtLink
      to="/"
      class="header__logo"
      >TRAKER</NuxtLink
    >
    <NuxtLink
      :to="ROUTES.JOBS"
      class="header__link"
    >
      Jobs
    </NuxtLink>
    <AppButton
      variant="secondary"
      size="md"
      type="button"
    >
      Login
    </AppButton>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply tw-flex tw-justify-between tw-items-center tw-p-2 tw-text-white tw-border-b tw-border-gray-700 tw-bg-gray-800;
}
</style>
