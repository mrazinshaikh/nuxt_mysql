<template>
    <Transition>
        <div class="fixed inset-0 bg-black/30 ">
            <div class="rounded absolute left-1/2 top-1/2 sm:top-1/4 -translate-x-1/2 -translate-y-1/2 bg-white w-11/12 sm:w-3/5" v-click-outside="() => $emit('close')">
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
                            <input type="text" id="title" class="form-input" placeholder="Title">
                        </div>
                        <div class="text-left">
                            <label for="amount">Amount</label>
                            <input type="number" id="amount" class="form-input" placeholder="Amount">
                        </div>
                        <div class="text-left">
                            <label for="description">Description</label>
                            <textarea class="form-input" id="description" placeholder="Title"></textarea>
                        </div>
                        <div class="text-left">
                            <label for="category">Category</label>
                            <select class="form-input">
                                <option value="needs">Needs</option>
                                <option value="wants">Wants</option>
                                <option value="savings">Savings</option>
                                <option value="donation">Donation</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="w-full border-t border-gray-700 p-3 flex justify-center gap-4">
                    <button class="btn btn-primary w-2/5">Save</button>
                    <button class="btn btn-secondary w-1/5">Reset</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'LogsAdd',
    setup(props){


        function test(){
            console.log('%cTest function called','font-size:30px; color:#ff0000;')
        }

        return {
            test
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