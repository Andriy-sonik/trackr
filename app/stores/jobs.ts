import type { TJob } from '~/models/TJob.ts'
import { STATUS } from '~/constants/index.ts'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<TJob[]>([
    {
      id: '12323123',
      company_name: 'Revolut',
      position: 'Frontend Engineer',
      status: STATUS.INTERVIEW,
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
  ])

  const addJob = (job: TJob) => {
    jobs.value.push(job)
  }

  return { jobs, addJob }
})
