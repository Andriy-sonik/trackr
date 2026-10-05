import type { TJob } from '~/models/TJob.ts'
import { STATUS } from '~/constants/index.ts'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<TJob[]>([])

  const addJob = (job: TJob) => {
    jobs.value.push(job)
  }

  const getJobs = async () => {
    const response = await fetch('/api/jobs')
    jobs.value = await response.json()
  }

  return { jobs, addJob, getJobs }
})
