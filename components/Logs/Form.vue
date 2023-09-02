<template>
    <Transition>
        <div class="fixed inset-0 bg-black/30 ">
            <div class="rounded absolute left-1/2 top-[40%] sm:top-1/3 -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 sm:w-3/5"
                v-click-outside="close">
                <form @submit.prevent="submit">
                    <!-- Header -->
                    <div class="w-full flex justify-between border-b border-gray-700 p-3">
                        <span v-if="isAdd">Add new log</span>
                        <span v-else>Edit log</span>
                        <button type="button" class="btn !p-0 text-base" @click="close">X</button>
                    </div>

                    <!-- Main -->
                    <div class="mt-2 p-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="text-left">
                                <label for="title">Title</label>
                                <input type="text" id="title" class="form-input" placeholder="Title" v-model="form.title">
                                <span v-if="form.errors?.title" class="text-xs text-red-600">{{ form.errors.title }}</span>
                            </div>
                            <div class="text-left">
                                <label for="amount">Amount</label>
                                <input type="number" id="amount" class="form-input" min="0" placeholder="Amount"
                                    v-model="form.amount">
                                <span v-if="form.errors?.amount" class="text-xs text-red-600">{{ form.errors.amount
                                }}</span>
                            </div>
                            <div class="text-left">
                                <label for="description">Description</label>
                                <textarea class="form-input" id="description" placeholder="Description"
                                    v-model="form.description"></textarea>
                                <span v-if="form.errors?.description" class="text-xs text-red-600">{{
                                    form.errors.description }}</span>
                            </div>
                            <div class="text-left">
                                <label for="category">Category</label>
                                <select class="form-input" v-model="form.category">
                                    <option value="">Select category</option>
                                    <option value="needs">Needs</option>
                                    <option value="wants">Wants</option>
                                    <option value="savings">Savings</option>
                                    <option value="donation">Donation</option>
                                </select>
                                <span v-if="form.errors?.category" class="text-xs text-red-600">{{ form.errors.category
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="w-full border-t border-gray-700 p-3 flex justify-center gap-4">
                        <button type="submit" class="btn btn-primary w-2/5">Save</button>
                        <button type="reset" class="btn btn-secondary w-1/5" @click="form.reset()">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script>
import _ from 'lodash';
import { useForm } from '~/composables/useForm';

export default {
    name: 'LogsForm',
    emits: ['close', 'refresh'],
    props: {
        // add / edit
        mode: {
            type: String,
            default: 'add'
        },
        log: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, { emit }) {
        const { $toast } = useNuxtApp();
        const isAdd = computed(() => {
            return props.mode === 'add'
        })

        const form = useForm({
            title: props.log?.title,
            description: props.log?.description,
            amount: props.log?.amount,
            category: props.log?.category ?? '',
        })

        async function submit() {
            if (!form.validate()) return;

            const { data, error } = await useFetch(`/api/logs${!isAdd.value ? '/' + props.log.id : ''}`, {
                method: isAdd.value ? 'POST' : 'PUT',
                body: form.data()
            })

            if (error.value) {
                $toast.show({ type:'danger', message: error.value.data.message, timeout: 5});
                return;
            }

            $toast.show({ type:'success', message: data.value.message, timeout: 5});
            form.reset();
            emit('refresh')
            close(true)
        }

        function close(force = false) {
            const hasData = Boolean(
                Object.keys(form.data()).filter((key) => {
                    if (!form[key]) {
                        return false
                    }
                    return true
                }).length
            )

            if ((hasData && !force) && !confirm('Are you sure to close? All input data will be lost!!')) {
                return;
            }

            form.reset();
            emit('close');
        }

        return {
            form,
            submit,
            close,
            isAdd
        }
    }
}
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>