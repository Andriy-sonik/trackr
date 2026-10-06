import { getDatabase } from '../utils/database'

export default defineEventHandler(async (event): Promise<{ id: string }> => {
  const id = getQuery(event).id

  if (typeof id !== 'string' || !id.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Job ID is required' })
  }

  const database = await getDatabase()
  const changes = await new Promise<number>((resolve, reject) => {
    database.run('DELETE FROM jobs WHERE id = ?', [id], function (error) {
      if (error) {
        reject(error)
        return
      }

      resolve(this.changes)
    })
  })

  if (changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Job not found' })
  }

  return { id }
})
