import { randomUUID } from 'node:crypto'
import type { TJob, TJobStatus } from '~/models/TJob'
import { STATUS } from '~/constants'
import { getDatabase } from '../utils/database'

type NewJob = Omit<TJob, 'id'>

function isJobStatus(value: unknown): value is TJobStatus {
  return Object.values(STATUS).some((status) => status === value)
}

function isNewJob(value: unknown): value is NewJob {
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

  if (!isNewJob(body)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid job data' })
  }

  const newJob: TJob = {
    id: randomUUID(),
    ...body,
  }

  const database = await getDatabase()
  await new Promise<void>((resolve, reject) => {
    database.run(
      `INSERT INTO jobs (id, company_name, position, status, date, job_link, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newJob.id,
        newJob.company_name,
        newJob.position,
        newJob.status,
        newJob.date,
        newJob.job_link,
        newJob.notes,
      ],
      (error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      },
    )
  })

  return newJob
})
