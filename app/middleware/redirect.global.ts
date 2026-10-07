import { ROUTES } from '~/constants/index.ts'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === ROUTES.JOBS) return

  return navigateTo(ROUTES.JOBS)
})
