<script setup lang="ts">
import { STATUS } from '~/constants/index.ts'
import type { TJob, TJobStatus } from '~/models/TJob.ts'

const props = defineProps<{ job: TJob }>()

const STATUS_COLORS: Record<TJobStatus, string> = {
  [STATUS.INTERVIEW]: 'green',
  [STATUS.APPLICATIONS]: 'yellow',
}

const statusColor = computed(() => STATUS_COLORS[props.job.status] ?? 'gray')
</script>

<template lang="html">
  <div
    class="app-card"
    :style="{ '--status-color': statusColor }"
  >
    <h6>{{ props.job.company_name || 'Company Name' }}</h6>
    <span>{{ props.job.position || 'Position' }}</span>
    <datetime>{{ props.job.date || 'Date' }}</datetime>
  </div>
</template>

<style lang="scss" scoped>
.app-card {
  @apply tw-bg-gray-600 tw-p-2 tw-rounded tw-mb-2;
  @apply tw-flex tw-flex-col tw-gap-1 tw-border tw-border-[var(--status-color)];

  h6 {
    @apply tw-text-white tw-font-semibold;
  }
  span {
    @apply tw-text-gray-300;
  }
  datetime {
    @apply tw-text-sm tw-text-[var(--status-color)];
  }
}
</style>
