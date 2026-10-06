import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import sqlite3 from 'sqlite3'

let databasePromise: Promise<sqlite3.Database> | undefined
const databasePath = join(process.cwd(), '.data', 'jobs.sqlite')

function openDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(databasePath, (error) => {
      if (error) {
        reject(error)
        return
      }

      database.exec(
        `CREATE TABLE IF NOT EXISTS jobs (
          id TEXT PRIMARY KEY,
          company_name TEXT NOT NULL,
          position TEXT NOT NULL,
          status TEXT NOT NULL,
          date TEXT NOT NULL,
          job_link TEXT NOT NULL,
          notes TEXT NOT NULL
        )`,
        (schemaError) => {
          if (schemaError) {
            reject(schemaError)
            return
          }

          resolve(database)
        },
      )
    })
  })
}

export async function getDatabase(): Promise<sqlite3.Database> {
  if (!databasePromise) {
    databasePromise = (async () => {
      await mkdir(dirname(databasePath), { recursive: true })
      return openDatabase()
    })()
  }

  return databasePromise
}
