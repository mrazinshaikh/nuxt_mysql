<template>
    <div class="relative pb-36 sm:pb-28 min-h-screen">
        <header class="border-b border-gray-900 w-full p-4 grid grid-cols-2 items-center">
            <div class="flex items-center gap-6">
                <h1 class="!text-sm font-light">Expense management System</h1>
                <button v-if="!$device.isMobile" class="btn btn-primary" @click.stop="$bus.emit('addLog:toggleModal')">Add log</button>
            </div>
            <nuxt-link to="/auth/logout" class="flex items-center justify-end text-blue-600" title="Logout">{{ $user.loggedUser().name }}<Icon class="ml-2" name="quill:off"/></nuxt-link>
        </header>

        <NuxtPage class="min-h-[78vh]"></NuxtPage>

        <Footer />
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