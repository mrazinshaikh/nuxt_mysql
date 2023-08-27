import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/store/auth'


export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const user = {
        loggedUser: () => {
            return authStore.user;
        },
        logout: authStore.logUserOut
    }
    return {
        provide: {
            user
        }
    }
})