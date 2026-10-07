<script setup lang="ts">
const { locales, setLocale } = useI18n()
const { setTheme, theme } = useTheme()
</script>

<template>
  <header class="header">
    <NuxtLink
      to="/"
      class="header__logo"
    >
      TRAKER
    </NuxtLink>
    <div class="header__actions">
      <AppdropDown
        :model-value="$i18n.locale"
        :data="locales"
        @update:model-value="(event) => setLocale(event)"
      />
      <AppSwither
        :model-value="theme === 'dark'"
        @update:model-value="(event) => setTheme(event ? 'dark' : 'light')"
      />
      <AppButton
        variant="secondary"
        size="md"
        type="button"
      >
        {{ $t('login') }}
      </AppButton>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply tw-flex tw-justify-between tw-items-center tw-p-2 tw-text-white tw-border-b tw-border-gray-700 tw-bg-gray-800;

  &__actions {
    @apply tw-flex tw-items-center tw-gap-2;
  }
}
</style>
