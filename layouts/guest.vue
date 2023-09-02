<template>
    <div class="relative pb-36 sm:pb-28 min-h-screen">
        <header class="border-b border-gray-900 w-full p-4 grid grid-cols-2 items-center">
            <div class="flex items-center gap-6">
                <h1 class="!text-sm font-light">Expense management System</h1>
            </div>
        </header>

        <NuxtPage></NuxtPage>

        <footer class="w-full flex flex-col md:flex-row absolute bottom-0 justify-between border-t border-black/50 text-base font-medium mt-10 px-5 md:px-10 py-6 gap-4">
            <div>Made with <span class="text-red-500">❤️</span> by <NuxtLink class="underline" to="https://github.com/mrazinshaikh" target="_blank" external>Razin Shaikh</NuxtLink>.</div>
            <NuxtLink
                to="https://github.com/mrazinshaikh/nuxt_mysql"
                target="_blank"
                external
                class="flex gap-2"
            >
                <img
                    src="/images/github-mark.svg"
                    height="30"
                    width="30"
                    alt="github icon"
                    class="w-4 object-contain"
                />
                <span class="text-sm underline">/mrazinshaikh/nuxt_mysql</span>
            </NuxtLink>
        </footer>
    </div>
</template>

<script>
import { useSeoMeta } from '#imports';

export default {
    name: 'GuestLayout',    
    setup(){
        useSeoMeta({
            title: 'Expanse management system'
        })
    }
}
</script>