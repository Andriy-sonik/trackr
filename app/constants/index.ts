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

const API_ROUTES = {
  JOBS: '/api/jobs',
  LOGIN: '/api/login',
} as const

export { STATUS, ROUTES, API_ROUTES }
