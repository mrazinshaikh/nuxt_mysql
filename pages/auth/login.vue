<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" method="POST">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="" tabindex="1" />
                            <span v-if="form.errors.email" class="text-sm text-red-500">{{ form.errors.email }}</span>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="form.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" tabindex="2" />
                            <span v-if="form.errors.password" class="text-sm text-red-500">{{ form.errors.password }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        tabindex="3" disabled />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300 line-through">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 line-through"
                                tabindex="5">Forgot
                                password?</a>
                        </div>
                        <button type="submit" tabindex="4"
                            @click.prevent="onSubmit"
                            :disabled="disabled"
                            :class="{'disabled !bg-primary-200 ':disabled}"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                            in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <a href="signup"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500" tabindex="6">Sign
                                up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '~/store/auth'

export default defineComponent({
    name: 'AuthLogin',
    setup(props) {
        const authStore = useAuthStore();
        const disabled = ref(true); 
        const form = useForm({
            email: '',
            password: ''
        })

        onMounted(() => {
            disabled.value = false;
        })

        function onSubmit() {
            const valid = form.validate();
            if (valid) {
                authStore.authenticateUser(form.email, form.password)
            }
        }
        return {
            disabled,
            form,
            onSubmit
        }
    }
})
</script>