import { defineStore } from 'pinia';
import { useFetch } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    user: {},
  }),
  actions: {
    async authenticateUser(username: string, password: string) {
      const { data, pending }: any = await useFetch('/api/auth/login', {
        method: 'post',
        body: {
          email: username,
          password,
        },
      });
      this.loading = pending.value;

      if (data.value && data.value.success) {
        this.authenticated = true; // set authenticated  state value to true
        this.user = data.value.user;

        return navigateTo('/');
      }

    },
    logUserOut() {
      this.authenticated = false;
      this.user = {};
      return navigateTo('/auth/login')
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'strict',
    })
  }
});