import type { TJob } from '~/models/TJob.ts'
import { API_ROUTES } from '~/constants/index.ts'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<TJob[]>([])

  const addJob = async (job: Omit<TJob, 'id'>) => {
    const createdJob = await $fetch<TJob>(API_ROUTES.JOBS, {
      method: 'POST',
      body: job,
    })
    jobs.value.push(createdJob)
    return createdJob
  }

  const updateJob = async (jobId: string, updatedJob: Omit<TJob, 'id'>) => {
    const updatedJobResponse = await $fetch<TJob>(API_ROUTES.JOBS, {
      method: 'PUT',
      query: { id: jobId },
      body: updatedJob,
    })

    jobs.value = jobs.value.map((job) => (job.id === jobId ? updatedJobResponse : job))

    return updatedJobResponse
  }

  const deleteJob = async (jobId: string | undefined) => {
    if (!jobId) {
      throw new Error('Job ID is required for deletion.')
    }
    await $fetch(API_ROUTES.JOBS, {
      method: 'DELETE',
      query: { id: jobId },
    })

    jobs.value = jobs.value.filter((job) => job.id !== jobId)
  }

  const getJobs = async () => {
    jobs.value = await $fetch<TJob[]>(API_ROUTES.JOBS)
  }

  return { jobs, addJob, deleteJob, getJobs, updateJob }
})
