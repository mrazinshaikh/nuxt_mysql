import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.authenticated && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
