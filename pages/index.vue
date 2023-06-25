<template>
  <div>
    <header class="border-b border-gray-900 w-full p-4 text-center">
      <h1 class="text-xl">Daily Logs</h1>
    </header>

    <main class="px-4">
      <div></div>

      <LogsTable :logs="logs" />
    </main>

  </div>
</template>

<script>
export default {
  name: "Home",
  async setup() {
    const logs = ref();

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
    };
  },
};
</script>
