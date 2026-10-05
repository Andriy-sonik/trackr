const STATUS = {
  INTERVIEW: 'interview',
  APPLICATIONS: 'applications',
  OFFER: 'offer',
  REJECTED: 'rejected',
} as const

const ROUTES = {
  JOBS: '/jobs',
  LOGIN: '/login',
} as const

export { STATUS, ROUTES }
