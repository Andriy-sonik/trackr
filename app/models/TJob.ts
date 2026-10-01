import { STATUS } from '~/constants/index.ts'

export type TJobStatus = (typeof STATUS)[keyof typeof STATUS]

export type TJob = {
  id: string
  company_name: string
  position: string
  status: TJobStatus
  date: string
  job_link: string
  notes: string
}
