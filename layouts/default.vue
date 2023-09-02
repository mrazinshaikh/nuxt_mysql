<template>
    <div>
        <header class="border-b border-gray-900 w-full p-4 text-center grid grid-cols-3 items-center">
            <h1 class="text-xl text-center col-start-2 font-light">Expense management System</h1>
            <nuxt-link to="/auth/logout" class="flex items-center justify-end text-blue-600" title="Logout">{{ $user.loggedUser().name }}<Icon class="ml-2" name="quill:off"/></nuxt-link>
        </header>

        <NuxtPage></NuxtPage>

        <footer class="w-full flex justify-between border-t border-black/50 text-base font-medium mt-20 px-10 py-6">
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
    name: 'DefaultLayout',    
    setup(){
        useSeoMeta({
            title: 'Expanse management system'
        })
    }
}
</script>