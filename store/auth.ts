import { defineStore } from "pinia";
import { useFetch } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: {},
  }),
  actions: {
    async authenticateUser(username: string, password: string) {
      return new Promise(async(resolve, reject) => {
        const { data, pending }: any = await useFetch("/api/auth/login", {
          method: "post",
          body: {
            email: username,
            password,
          },
        });
        this.loading = pending.value;

        if (data.value && data.value.success) {
          this.authenticated = true; // set authenticated  state value to true
          this.user = data.value.user;
          const tokenCookie = useCookie("token");
          tokenCookie.value = data.value.token;
          resolve(1);
          return navigateTo("/");
        }
        resolve(1);
      });
    },
    logUserOut() {
      this.authenticated = false;
      this.user = {};
      useCookie("token").value = null;
      return navigateTo("/auth/login");
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: "strict",
    }),
  },
});
