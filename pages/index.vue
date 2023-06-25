<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <button class="p-2 px-4 bg-blue-500 text-white text-xl" @click="getAllLogs">
      Api Call
    </button>

    <pre>{{ logs }}</pre>
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
