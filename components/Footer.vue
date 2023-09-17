<template>
    <footer class="w-full flex flex-col md:flex-row bg-white sticky z-50 bottom-0 justify-between border-t border-black/50 text-base font-medium mt-10 px-5 md:px-10 py-4 gap-4">
        <div class="!text-sm">Made with <span class="text-red-500">❤️</span> by <NuxtLink class="underline" to="https://github.com/mrazinshaikh" target="_blank" external>Razin Shaikh</NuxtLink>.</div>
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
</template>

<script>
export default {
    name: 'Footer'
}
</script>