<template>
    <div class="max-h-[80vh] overflow-y-scroll">
        <table class="border w-full table-auto rounded-lg">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Title</th>
                    <th scope="col" class="px-6 py-3">Description</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th scope="col" class="px-6 py-3">Category</th>
                    <th scope="col" class="px-6 py-3">When</th>
                    <th scope="col" class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logs.value" :key="log.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    scope="row">
                    <td scope="col" class="px-6 py-4">{{ log.id }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.title }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.description }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.amount }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.category }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.create_at }}</td>
                    <td scope="col" class="px-6 py-4">
                        <div class="flex justify-around gap-2">
                            <button>
                                <Icon name="material-symbols:edit-square-outline" size="1.5rem" />
                            </button>
                            <button class="cursor-pointer" @click="$emit('deleteLog', log)">
                                <Icon name="ic:baseline-delete" size="1.5rem" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'LogsTable',
    props: {
        logs: {
            type: [Array, Object],
            default: {}
        }
    },
    emits: ['deleteLog']
}
</script>