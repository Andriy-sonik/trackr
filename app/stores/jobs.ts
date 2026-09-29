type Job = {
  id: string
  company_name: string
  position: string
  status: string
  date: string
  job_link: string
  notes: string
}
const STATUS = {
  INTERVIEW: 'interview',
  APPLICATIONS: 'applications',
}

export const useJobsStore = defineStore('counter', () => {
  const jobs = ref<Job[]>([
    {
      id: '12323123',
      company_name: 'Revolut',
      position: 'Frontend Engineer',
      status: STATUS.INTERVIEW,
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
    {
      id: '12323123',
      company_name: 'Revolut',
      position: 'Frontend Engineer',
      status: STATUS.APPLICATIONS,
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
  ])

  const addJob = (job: Job) => {
    jobs.value.push(job)
  }

  return { jobs, addJob }
})
