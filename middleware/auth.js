import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (
    !authStore.authenticated &&
    ["/auth/logout", "/auth/login"].includes(to.path)
  ) {
    return navigateTo("/auth/logout");
  }
});
