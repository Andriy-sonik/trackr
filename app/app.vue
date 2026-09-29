<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './components/UI/AppButton.vue'
import AppModal from './components/UI/AppModal.vue'
import { useJobsStore } from '~/stores/jobs.ts'

type Job = {
  id: string
  company_name: string
  position: string
  status: string
  date: string
  job_link: string
  notes: string
}

const navItems = [{ name: 'Board', icon: 'board' }]

// interview, applications
const STATUS = {
  INTERVIEW: 'interview',
  APPLICATIONS: 'applications',
}
const store = useJobsStore()

const activeJobs = computed(() =>
  store.jobs.reduce((acc, job) => (job.status === STATUS.INTERVIEW ? acc + 1 : acc), 0),
)

const groupedJobs = computed(() => {
  return Object.groupBy(store.jobs, (job) => job.status)
})

const modal = useModal()
const openAddJobModal = () => {
  modal.open('AddJob')
}
</script>

<template>
  <main class="main">
    <!-- <aside class="sidebar">
      <div class="sidebar__logo">TRAKER</div>
      <nav class="sidebar__nav">
        <ul>
          <li
            v-for="item in navItems"
            :key="item.name"
            class="sidebar__nav-item"
          >
            <AppIcon
              :name="item.icon"
              :size="24"
            />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </nav>
      <button class="sidebar__logout-button">
        <AppIcon
          name="logout"
          :size="24"
        />
        <span>Add</span>
      </button>
    </aside> -->
    <article class="content">
      <div class="content__header">
        <h3 class="content__header-title">
          Мої відгуки
          <span>({{ activeJobs }} активних)</span>
        </h3>
        <AppButton
          variant="primary"
          size="md"
          type="button"
          @click="openAddJobModal"
        >
          Додати
        </AppButton>
      </div>
      <div class="content__body">
        <div
          v-for="(jobs, category) in groupedJobs"
          key="category"
          class="content__body-group"
        >
          <h6>{{ category }}</h6>
          <ul>
            <li>
              <AppCard
                v-for="job in jobs"
                :key="job.id"
                :job="job"
                class="content__body-item"
              />
            </li>
          </ul>
        </div>
      </div>
    </article>
    <ClientOnly>
      <AppModal />
    </ClientOnly>
  </main>
</template>
<style lang="scss" scoped>
.main {
  @apply tw-flex tw-h-[100vh];
}
.content {
  @apply tw-flex-1 tw-flex tw-flex-col tw-p-4;
}

.content__header {
  @apply tw-flex tw-justify-between tw-items-center tw-gap-2 tw-p-2;
}
.content__header-title {
  @apply tw-text-2xl tw-font-semibold tw-text-white;
}

.content__body {
  @apply tw-flex tw-gap-2;
}

.content__body-group {
  @apply tw-text-white tw-flex tw-flex-col tw-gap-2;
  @apply tw-capitalize tw-font-semibold;
}

.sidebar {
  @apply tw-flex tw-flex-col tw-bg-gray-100 tw-p-4 tw-w-64 tw-h-[100vh] tw-border-r tw-border-gray-300 tw-gap-4;
}
.sidebar__logo {
  @apply tw-text-2xl tw-font-bold;
}
.sidebar__nav-item {
  @apply tw-flex tw-items-center tw-gap-2;
  @apply tw-bg-slate-500 tw-p-2 tw-rounded tw-mb-2 hover:tw-bg-slate-600;
  @apply tw-cursor-pointer;
}
.sidebar__logout-button {
  @apply tw-mt-auto;
  @apply tw-flex tw-items-center tw-gap-2;
  @apply tw-bg-red-500 tw-p-2 tw-rounded hover:tw-bg-red-600;
  @apply tw-cursor-pointer;
}
</style>
