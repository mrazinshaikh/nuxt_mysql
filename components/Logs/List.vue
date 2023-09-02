<template>
    <div class="">
        <table v-if="!$device.isMobile" class="border w-full table-auto rounded-lg">
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
                <tr v-for="(log, index) in logs" :key="log.id" class="bg-white border-b hover:bg-gray-300/20 dark:bg-gray-800 dark:border-gray-700 text-center" 
                    scope="row"
                    :class="{'bg-gray-300 bg-opacity-20': index % 2 > 0}"
                >
                    <td scope="col" class="px-6 py-4">{{ log.id }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.title }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.description }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.amount }}</td>
                    <td scope="col" class="px-6 py-4 capitalize">{{ log.category }}</td>
                    <td scope="col" class="px-6 py-4">{{ log.created_at.slice(0,10) }}</td>
                    <td scope="col" class="px-6 py-4">
                        <div class="flex justify-around gap-2">
                            <button class="cursor-pointer" @click.stop="$emit('editLog', log)">
                                <Icon name="material-symbols:edit-square-outline" size="1.5rem" />
                            </button>
                            <button class="cursor-pointer" @click.stop="$emit('deleteLog', log)">
                                <Icon name="ic:baseline-delete" size="1.5rem" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else>
            <table
                v-for="(log,index) in logs"
                :key="log.id"
                class="border w-full table-auto rounded-lg mt-4"
            >
                <tr class="border border-collapse bg-gray-300 bg-opacity-20">
                    <td class="p-4 w-16">Id</td>
                    <td>{{ log.id }}</td>
                </tr>
                <tr class="border border-collapse">
                    <td class="p-4 w-16">Title</td>
                    <td>{{ log.title }}</td>
                </tr>
                <tr class="border border-collapse bg-gray-300 bg-opacity-20">
                    <td class="p-4 w-16">Description</td>
                    <td>{{ log.description }}</td>
                </tr>
                <tr class="border border-collapse">
                    <td class="p-4 w-16">Amount</td>
                    <td>{{ log.amount }}</td>
                </tr>
                <tr class="border border-collapse bg-gray-300 bg-opacity-20">
                    <td class="p-4 w-16">Category</td>
                    <td>{{ log.category }}</td>
                </tr>
                <tr class="border border-collapse">
                    <td class="p-4 w-16">Created_at</td>
                    <td>{{ log.created_at.slice(0,10) }}</td>
                </tr>
                <tr class="border border-collapse bg-gray-300 bg-opacity-20 text-center">
                    <td class="p-3">
                    </td>
                    <td class="p-3 flex gap-16 justify-end">
                        <button class="cursor-pointer" @click.stop="$emit('deleteLog', log)">
                            <Icon name="ic:baseline-delete" size="1.5rem" />
                        </button>
                        <button class="cursor-pointer" @click.stop="$emit('editLog', log)">
                            <Icon name="material-symbols:edit-square-outline" size="1.5rem" />
                        </button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="flex gap-8 justify-end mt-6">
            <button
                v-show="totalPage > 1"
                class="btn btn-primary-hover"
                :class="{'opacity-50 cursor-not-allowed': $route.query.page <= 1}"
                :disabled="$route.query.page <= 1"
                title="Previous page"
                @click="prev"
            >Previous</button>
            <button
                v-show="totalPage > 1"
                class="btn btn-primary-hover"
                :class="{'opacity-50 cursor-not-allowed': $route.query.page >= totalPage}"
                :disabled="$route.query.page >= totalPage"
                title="Next page"
                @click="next"
            >Next</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LogsTable',
    props: {
        logs: {
            type: [Array, Object],
            default: {}
        },
        totalPage: {
            type: [Number, null],
            default: 1
        },
    },
    emits: ['deleteLog', 'editLog'],
    setup(props){
        const $route = useRoute()
        const $router = useRouter()
        const {$toast} = useNuxtApp();

        function prev(){
            if($route.query.page <= 1) {
                $toast.show({ type:'info', message: 'Bro where do you want to go 💁', timeout: 5});
                return;
            }

            const params = $route.query?.page || 1
            if(params > 1){
                $router.push({query: {page : params - 1}})
            } 
        }
        function next(){
            if($route.query.page >= props.totalPage) {
                $toast.show({ type:'info', message: 'Bro where do you want to go 💁', timeout: 5});
                return;
            }

            const params = $route.query?.page || 1
            if(params < props.totalPage){
                $router.push({query: {page : Number(params) + 1}})
            } 
        }
        return {
            next,
            prev
        }
    }
}
</script>