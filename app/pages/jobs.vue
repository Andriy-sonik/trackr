<script setup lang="ts">
import { useJobsStore } from '~/stores/jobs.ts'
import { STATUS } from '~/constants/index.ts'
import type { TJob, TJobStatus } from '~/models/TJob.ts'
const store = useJobsStore()
const { jobs } = storeToRefs(store)

const activeJobs = computed<number>(() =>
  (jobs.value || []).reduce((acc, job) => (job.status === STATUS.INTERVIEW ? acc + 1 : acc), 0),
)

const groupedJobs = computed<Partial<Record<TJobStatus, TJob[]>>>(() => {
  return Object.groupBy(jobs.value || [], (job) => job.status)
})

const categories: Record<TJobStatus, string> = {
  [STATUS.INTERVIEW]: "Інтерв'ю",
  [STATUS.APPLICATIONS]: 'Відгуки',
  [STATUS.OFFER]: 'Пропозиції',
  [STATUS.REJECTED]: 'Відмови',
}

const modal = useModal()

const openAddJobModal = () => {
  modal.open('DetailedJob')
}
onMounted(async () => {
  await store.getJobs()
})
</script>
<template lang="">
  <div class="job-page">
    <header class="job-page__header">
      <h1 class="job-page__header-title">
        {{ $t('my_reviews') }}
        <span>({{ activeJobs }} активних)</span>
      </h1>
      <AppButton
        variant="primary"
        size="md"
        type="button"
        @click="openAddJobModal"
      >
        {{ $t('add_job') }}
      </AppButton>
    </header>
    <div class="job-page__content">
      <div
        v-for="(name_category, key_category) in categories"
        :key="key_category"
        class="job-page__category"
      >
        <h6 class="job-page__category-title">
          <AppIcon
            name="mail"
            :size="16"
          />
          {{ name_category }}
        </h6>
        <ul>
          <li>
            <AppCard
              v-for="job in groupedJobs[key_category] || []"
              :key="job.id"
              :job="job"
              class="job-page__content-body-item"
              @click="modal.open('DetailedJob', { job })"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.job-page {
  @apply tw-p-4;
  &__header {
    @apply tw-flex tw-justify-between tw-items-center tw-mb-4;
    &-title {
      @apply tw-text-lg tw-font-semibold tw-text-white;
      span {
        @apply tw-text-gray-500 tw-text-sm tw-ml-2;
      }
    }
  }

  &__content {
    @apply tw-grid tw-gap-4 tw-grid-cols-4;
  }

  &__category {
    @apply tw-flex tw-flex-col tw-gap-2;
    &-title {
      @apply tw-flex tw-items-center tw-gap-1 tw-text-lg tw-font-semibold tw-text-white tw-capitalize;
    }
  }
}
</style>
