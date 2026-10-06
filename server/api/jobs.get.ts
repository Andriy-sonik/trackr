import type { TJob } from '~/models/TJob'
import { getDatabase } from '../utils/database'

export default defineEventHandler(async () => {
  const database = await getDatabase()

  return new Promise<TJob[]>((resolve, reject) => {
    database.all<TJob>(
      `SELECT id, company_name, position, status, date, job_link, notes
       FROM jobs
       ORDER BY rowid DESC`,
      (error, rows) => {
        if (error) {
          reject(error)
          return
        }

        resolve(rows)
      },
    )
  })
})
