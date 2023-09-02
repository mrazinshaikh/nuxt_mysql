<template>
  <main class="px-4 mt-4">
    <div class="my-4">
      <!-- <button class="btn btn-primary" @click.stop="showAddModal = true">Add new</button> -->
      <h1 class="text-xl">Expense logs:</h1>

      <div v-if="showLoadButton">
        <button class="btn btn-primary mt-4" @click="loadData">
          Load logs data
        </button>
        <label class="block mt-2 text-sm text-gray-500" for="">*This is to avoid hitting (hobby plans) limitations over deployment of db</label>
      </div>
      <LogsForm v-show="showAddModal" @close="showAddModal = false" @refresh="getAllLogs" />
    </div>

    <LogsList
        v-if="logs.length > 0"
        :logs="logs"
        :totalPage="totalPage"
        @deleteLog="deleteLog"
        @editLog="(log) => editLog = log"
    />
    <LogsForm v-if="Object.keys(editLog).length" mode="edit" :log="editLog" @close="editLog = false"
      @refresh="getAllLogs" />
  </main>
</template>

<script>
import LogsList from '~/components/Logs/List.vue';
import LogsForm from '~/components/Logs/Form.vue';

export default {
  name: "Home",
  components: {
    LogsList, LogsForm,
  },
  async setup() {
    definePageMeta({
      middleware: ['auth']
    })
    const { $toast, $bus } = useNuxtApp();
    const $route = useRoute();
    const logs = ref({});
    const showLoadButton = ref(true);
    const totalPage = ref();
    const showAddModal = ref(false);
    const editLog = ref({});

    watch(() => $route.query, async (value) => {
      if(value.page > 0){
        await getAllLogs();
      }
    })

    onMounted(() => {
      $bus.on('addLog:toggleModal', (value = !showAddModal.value) => {
        showAddModal.value = value;
      })
      // nextTick(async () => {
      //   await getAllLogs();
      // })
    })


    async function loadData(){
      showLoadButton.value = false
      await getAllLogs();
    }

    async function getAllLogs() {
      const { data } = await useFetch("/api/logs", {
        method: "GET",
        query: $route.query
      })

      logs.value = data.value.logs
      totalPage.value = data.value.totalPage
    }

    async function deleteLog(log) {
      if (confirm(`Are you sure to delete this log: ${log.title}`)) {
        const { data, error } = await useFetch(`/api/logs/${log.id}`, {
          method: 'DELETE',
        })
        if (error.value) {
          $toast.show({ type: 'danger', message: error.value.data.message, timeout: 5 });
          return;
        }

        getAllLogs();
        $toast.show({ type: 'success', message: data.value.message, timeout: 5 });
      }
    }

    return {
      logs,
      totalPage,
      loadData,
      showLoadButton,
      getAllLogs,
      showAddModal,
      deleteLog,
      editLog,
    };
  },
};
</script>
