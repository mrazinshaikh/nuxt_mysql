import { defineNuxtPlugin } from '#app'
import { createToaster } from "@meforma/vue-toaster";


export default defineNuxtPlugin((nuxtApp) => {
    const toaster = createToaster({ duration: 5000 })

    return {
        provide: {
            toast: toaster
        }
    }
})