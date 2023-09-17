<template>
    <section class="py-8">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6/ sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6/" method="POST">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com" required="" tabindex="1" />
                            <span v-if="form.errors.email" class="text-sm text-red-500">{{ form.errors.email }}</span>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="form.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required="" tabindex="2" />
                            <span v-if="form.errors.password" class="text-sm text-red-500">{{ form.errors.password }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        tabindex="3" disabled />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 line-through">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline line-through"
                                tabindex="5">Forgot
                                password?</a>
                        </div>
                        <button type="submit" tabindex="4"
                            @click.prevent="onSubmit"
                            :disabled="disabled"
                            :class="{'disabled !bg-primary-200 ':disabled}"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                            in</button>
                        <p class="text-sm font-light text-gray-500 !mt-2">
                            Don't have an account yet? <nuxt-link to="/auth/register"
                                class="font-medium text-primary-600 hover:underline" tabindex="6">Sign
                                up</nuxt-link>
                        </p>
                    </form>
                </div>
            </div>
            <div
                v-if="response || response?.statusCode === 400"
                class="w-full bg-gray-200 rounded-lg shadow sm:max-w-md mt-4 p-4 text-sm"
            >
                <p>Database might be in sleep mode, On Planetscale hobby plan, db automatically sleep if 7 days of inactivity. Please reach out to me if you want to test this out, i would be more than happy.</p>
                
                <p class="mt-2">
                    <NuxtLink
                        to="https://www.linkedin.com/in/mrazinshaikh/"
                        class="flex gap-x-2 items-center"
                        target="_blank"
                        :external="true"
                    >
                        <Icon name="skill-icons:linkedin" color="black" />
                        <span class="underline">mrazinshaikh</span>
                    </NuxtLink>
                </p>
                <p class="mt-2">
                    <NuxtLink
                        to="https://mail.google.com/mail/?view=cm&fs=1&to=razinshaikh8732@gmail.com&su=Nuxt_MySql revive the database please&body=How are you doing...."
                        class="flex gap-x-2 items-center"
                        target="_blank"
                        :external="true"
                    >
                        <Icon name="logos:google-gmail" color="black" />
                        <span class="underline">razinshaikh8732@gmail.com</span>
                    </NuxtLink>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '~/store/auth'

export default defineComponent({
    name: 'AuthLogin',
    setup(props) {
        definePageMeta({
            layout: 'guest',
            middleware: ['guest']
        })
        const authStore = useAuthStore();
        const disabled = ref(true); 
        const form = useForm({
            email: '',
            password: ''
        })
        const response = ref(false);

        onMounted(() => {
            disabled.value = false;
        })

        async function onSubmit() {
            const valid = form.validate();
            if (valid) {
                const rsp = await authStore.authenticateUser(form.email, form.password)
                console.log(rsp.value)
                console.log(rsp.value.statusCode)
                response.value = rsp.value
            }
        }
        return {
            disabled,
            form,
            onSubmit,
            response
        }
    }
})
</script>