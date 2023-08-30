<template>
  <div>
    <header class="border-b border-gray-900 w-full p-4 text-center grid grid-cols-3 items-center">
      <h1 class="text-xl text-center col-start-2">Expense management</h1>
      <nuxt-link to="/auth/logout" class="flex items-center justify-end text-blue-600" title="Logout">{{ $user.loggedUser().name }}<Icon class="ml-2" name="quill:off"/></nuxt-link>
    </header>

    <main class="px-4 mt-4">
      <div class="text-right my-4">
        <button class="btn btn-primary" @click.stop="showAddModal = true">Add new</button>
        <LogsForm v-show="showAddModal" @close="showAddModal = false" @refresh="getAllLogs" />
      </div>

      <LogsList :logs="logs" @deleteLog="deleteLog" @editLog="(log) => editLog = log" />
      <LogsForm
        v-if="Object.keys(editLog).length" 
        mode="edit" 
        :log="editLog" 
        @close="editLog = false"
        @refresh="getAllLogs"
      />
    </main>

  </div>
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
    const { $toast } = useNuxtApp();
    const logs = ref();
    const showAddModal = ref(false);
    const editLog = ref({});

    await getAllLogs();

    async function getAllLogs() {
      logs.value = (
        await useFetch("/api/logs", {
          method: "GET",
        })
      ).data;
    }

    async function deleteLog(log) {
      if (confirm(`Are you sure to delete this log: ${log.title}`)) {
        const { data, error } = await useFetch(`/api/logs/${log.id}`, {
          method: 'DELETE',
        })
        if (error.value) {
          $toast.show({ type:'danger', message: error.value.data.message, timeout: 5});
          return;
        }

        getAllLogs();
        $toast.show({ type:'success', message: data.value.message, timeout: 5});
      }
    }

    return {
      logs,
      getAllLogs,
      showAddModal,
      deleteLog,
      editLog,
    };
  },
};
</script>
