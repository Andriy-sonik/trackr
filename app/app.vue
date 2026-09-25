<script setup lang="ts">
const navItems = [{ name: 'Board', icon: 'board' }]

const bord = ref({
  applications: [
    {
      id: '12323123',
      company_name: 'Revolut',
      position: 'Frontend Engineer',
      status: 'Подано',
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
    {
      id: 'sdfsdf2342',
      company_name: 'Revolut1',
      position: 'Frontend Engineer',
      status: 'Подано',
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
  ],
  interview: [
    {
      id: '213131',
      company_name: 'Revolut2',
      position: 'Frontend Engineer',
      status: 'Подано',
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
  ],
})
</script>

<template>
  <main class="main">
    <aside class="sidebar">
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
    </aside>
    <article class="content">
      <div class="content__header">
        <h3>Мої відгуки</h3>
        <span>10 активних</span>
        <button>Додати</button>
      </div>
      <div class="content__body">
        <div
          v-for="(column, idx) in bord"
          :key="idx"
          class="content__body-item"
        >
          <h5>{{ idx }}</h5>
          <ul>
            <li
              v-for="job in column"
              :key="job.id + job.company_name"
            >
              <AppCard :job="job" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  </main>
</template>
<style lang="scss" scoped>
.main {
  @apply tw-flex tw-h-[100vh];
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
.content__body {
  @apply tw-flex tw-gap-2;
}
.content__body-item {
  @apply tw-bg-gray-200 tw-p-2 tw-rounded tw-mb-2;
}
</style>
