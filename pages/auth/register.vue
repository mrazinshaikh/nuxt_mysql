<template>
    <section class="py-8">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Register new account
                    </h1>
                    <form class="space-y-4" method="POST">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input v-model="form.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com">
                            <span v-if="form.errors.email" class="text-xs text-red-500">{{ form.errors.email }}</span>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input v-model="form.password" type="text" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " >
                            <span v-if="form.errors.password" class="text-xs text-red-500">{{ form.errors.password }}</span>
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                            <input v-model="form.repassword" type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " >
                            <span v-if="form.errors.repassword" class="text-xs text-red-500">{{ form.errors.repassword }}</span>
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input v-model="form.terms" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="font-light text-gray-500 ">I accept the <nuxt-link to="/auth/terms" class="font-medium text-primary-600 hover:underline">Terms and Conditions</nuxt-link></label>
                            </div>

                        </div>
                        <span v-if="form.errors.terms" class="text-xs text-red-500 ">{{ form.errors.terms }}</span>
                        <span v-if="(typeof form.errors) === 'string'" class="text-xs text-red-500 ">{{ form.errors }}</span>
                        <button
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            :class="{'animate-pulse opacity-50 cursor-wait': loading}"
                            :disabled="loading"
                            @click.prevent="onSubmit"
                        >Create an account</button>
                        <p class="text-sm font-light text-gray-500 ">
                            Already have an account? <nuxt-link to="/auth/login" class="font-medium text-primary-600 hover:underline">Login here</nuxt-link>
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
    name: 'Register',
    setup(props) {
        definePageMeta({
            layout: 'guest',
            middleware: ['guest']
        })
        const authStore = useAuthStore();
        const loading = ref(false);
        const disabled = ref(true);
        const message = ref({
            terms: 'Check this dam box bruh!! 😏'
        })
        const form = useForm({
            email: '',
            password: '',
            repassword: '',
            terms: true
        }, message.value)

        onMounted(() => {
            disabled.value = false;
        })

        async function onSubmit() {
            if(loading.value) return;
            loading.value = true;
            form.errors = {};
            const valid = form.validate();

            const passwordValid = form.password === form.repassword;
            if(!passwordValid) {
                message.value.repassword = 'Password not match'
                form.errors.repassword = message.value.repassword
                loading.value = true;
            }
            if (valid) {
                // to remove backend errors
                const { data } = await useFetch('/api/auth/register', {
                    method: 'post',
                    body: form.data()
                })
                if (!data.value.success) {
                    form.errors = data.value.message;
                    loading.value = false;
                    return;
                }

                await authStore.authenticateUser(form.email, form.password)
                loading.value = false;
                form.reset();
            }
            loading.value = false;
        }
        return {
            disabled,
            form,
            onSubmit,
            loading
        }
    }
})
</script>