<template>
  <div>
    <header class="border-b border-gray-900 w-full p-4 text-center">
      <h1 class="text-xl">Expense management</h1>
    </header>

    <main class="px-4 mt-4">
      <div class="text-right my-4">
        <button class="btn btn-primary" @click.stop="showAddModal = true">Add new</button>
        <LogsAdd v-show="showAddModal" @close="showAddModal = false" />
      </div>

      <LogsList :logs="logs" />
    </main>

  </div>
</template>

<script>
import LogsList from '~/components/Logs/List.vue';
import LogsAdd from '~/components/Logs/Add.vue';


export default {
  name: "Home",
  components: {
    LogsList, LogsAdd,
  },
  async setup() {
    const logs = ref();
    const showAddModal = ref(true);

    await getAllLogs();

    async function getAllLogs() {
      logs.value = (
        await useFetch("/api/logs", {
          method: "GET",
        })
      ).data;
    }

    return {
      logs,
      getAllLogs,
      showAddModal,
    };
  },
};
</script>
