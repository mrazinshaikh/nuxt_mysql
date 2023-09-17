<template>
    <section class="px-4 py-8">
        <p class="text-lg">
            Are you really going to read the terms, seriously dude, have a life <br/>  
            Just hit that dam checkbox 😅😅.</p>
        <div>
            <nuxt-link
                to="/auth/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
                Signup
            </nuxt-link>
        </div>
    </section>
</template>

<script>
export default defineComponent({
    name: 'Terms',
    setup() {
        definePageMeta({
            layout: 'guest'
        })
    }
})
</script>