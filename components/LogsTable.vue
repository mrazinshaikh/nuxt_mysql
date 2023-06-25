<template>
    <table class="border w-full table-auto	">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Title</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Amount</th>
                <th scope="col" class="px-6 py-3">Category</th>
                <th scope="col" class="px-6 py-3">When</th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="log in logs.value" 
                :key="log.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td class="px-6 py-4">{{ log.id }}</td>
                <td class="px-6 py-4">{{ log.title }}</td>
                <td class="px-6 py-4">{{ log.description }}</td>
                <td class="px-6 py-4">{{ log.amount }}</td>
                <td class="px-6 py-4">{{ log.category }}</td>
                <td class="px-6 py-4">{{ log.create_at }}</td>
            </tr>
        </tbody>
    </table>
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
}
</script>