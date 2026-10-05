import { STATUS } from '~/constants'

export default defineEventHandler(() => {
  console.log('Node.js + SQLite')
  return [
    {
      id: '12323123',
      company_name: 'Revolut',
      position: 'Frontend Engineer',
      status: STATUS.INTERVIEW,
      date: '12 вер',
      job_link: 'https://www.revolut.com/',
      notes: 'Some notes about the job application',
    },
  ]
})
