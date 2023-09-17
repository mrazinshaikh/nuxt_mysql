<template>
    <div class="relative min-h-screen">
        <header class="border-b border-gray-900 w-full px-5 md:px-10 py-4 items-center">
            <div class="flex items-center gap-6">
                <h1 class="!text-sm font-light">Expense management System</h1>
            </div>
        </header>

        <NuxtPage class="min-h-[78vh]"></NuxtPage>

        <Footer />
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