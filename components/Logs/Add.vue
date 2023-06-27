<template>
    <Transition>
        <div class="fixed inset-0 bg-black/30 ">
            <div class="rounded absolute left-1/2 top-1/2 sm:top-1/3 -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 sm:w-3/5"
                v-click-outside="() => $emit('close')">
                <form @submit.prevent="submit">
                    <!-- Header -->
                    <div class="w-full flex justify-between border-b border-gray-700 p-3">
                        <span>Add new log</span>
                        <button class="btn !p-0 text-base" @click="$emit('close')">X</button>
                    </div>

                    <!-- Main -->
                    <div class="mt-2 p-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="text-left">
                                <label for="title">Title</label>
                                <input type="text" id="title" class="form-input" placeholder="Title" v-model="form.title">
                                <span v-if="errors.title" class="text-xs text-red-600">{{ errors.title  }}</span>
                            </div>
                            <div class="text-left">
                                <label for="amount">Amount</label>
                                <input type="number" id="amount" class="form-input" placeholder="Amount"
                                    v-model="form.amount">
                                <span v-if="errors.amount" class="text-xs text-red-600">{{ errors.amount  }}</span>
                            </div>
                            <div class="text-left">
                                <label for="description">Description</label>
                                <textarea class="form-input" id="description" placeholder="Description"
                                    v-model="form.description"></textarea>
                                <span v-if="errors.description" class="text-xs text-red-600">{{ errors.description  }}</span>
                            </div>
                            <div class="text-left">
                                <label for="category">Category</label>
                                <select class="form-input" v-model="form.category">
                                    <option>Select category</option>
                                    <option value="needs">Needs</option>
                                    <option value="wants">Wants</option>
                                    <option value="savings">Savings</option>
                                    <option value="donation">Donation</option>
                                </select>
                                <span v-if="errors.category" class="text-xs text-red-600">{{ errors.category  }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="w-full border-t border-gray-700 p-3 flex justify-center gap-4">
                        <button type="submit" class="btn btn-primary w-2/5">Save</button>
                        <button type="reset" class="btn btn-secondary w-1/5">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'LogsAdd',
    setup(props) {
        const form = ref({
            title: '',
            description: '',
            amount: '',
            category: '',
        })

        const errors = ref({});

        function validate() {
            return !Boolean(Object.keys(form.value).filter((key) => {
                if(key && !form.value[key]){
                    errors.value[key] = 'Field is required';
                    return true;
                }
                return false;
            }).length)
        }

        function submit() {
            if(!validate()) return;

            console.log('%cValid','font-size:30px; color:#0f0;')
        }

        return {
            form,
            errors,
            submit
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