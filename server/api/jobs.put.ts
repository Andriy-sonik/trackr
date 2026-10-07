import type { TJob, TJobStatus } from '~/models/TJob'
import { STATUS } from '~/constants'
import { getDatabase } from '../utils/database'

type UpdatedJob = Omit<TJob, 'id'>

function isJobStatus(value: unknown): value is TJobStatus {
  return Object.values(STATUS).some((status) => status === value)
}

function isUpdatedJob(value: unknown): value is UpdatedJob {
  if (!value || typeof value !== 'object') {
    return false
  }

  return (
    'company_name' in value &&
    typeof value.company_name === 'string' &&
    'position' in value &&
    typeof value.position === 'string' &&
    'status' in value &&
    isJobStatus(value.status) &&
    'date' in value &&
    typeof value.date === 'string' &&
    'job_link' in value &&
    typeof value.job_link === 'string' &&
    'notes' in value &&
    typeof value.notes === 'string'
  )
}

export default defineEventHandler(async (event): Promise<TJob> => {
  const body: unknown = await readBody(event)
  const jobId = getQuery(event).id

  if (typeof jobId !== 'string' || !jobId.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Job ID is required for updating' })
  }

  if (!isUpdatedJob(body)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid job data' })
  }

  const database = await getDatabase()
  const updatedJob: TJob = {
    id: jobId,
    ...body,
  }

  const changes = await new Promise<number>((resolve, reject) => {
    database.run(
      `UPDATE jobs
       SET company_name = ?, position = ?, status = ?, date = ?, job_link = ?, notes = ?
       WHERE id = ?`,
      [updatedJob.company_name, updatedJob.position, updatedJob.status, updatedJob.date, updatedJob.job_link, updatedJob.notes, jobId],
      function (error) {
        if (error) {
          reject(error)
          return
        }

        resolve(this.changes)
      },
    )
  })

  if (changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Job not found' })
  }

  return updatedJob
})
