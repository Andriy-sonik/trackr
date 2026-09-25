<script setup lang="ts">
type TInfoJob = {
  company_name: string
  position: string
  status: string
  date: string
  job_link: string
  notes: string
}

const props = defineProps<{ job: TInfoJob }>()
</script>

<template lang="">
  <div>
    <h6>{{ props.job.company_name || 'Company Name' }}</h6>
    <span>{{ props.job.position || 'Position' }}</span>
    <datetime>{{ props.job.date || 'Date' }}</datetime>
  </div>
</template>

<style lang=""></style>
