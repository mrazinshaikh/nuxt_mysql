<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="max-w-4xl p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-4xl font-semibold mb-4">
        {{ error.statusCode }} {{ error.statusMessage ? "-" : "" }}
        {{ error.statusMessage }}
      </h1>
      <p class="text-gray-700 mb-6">{{ error.message }}</p>

      <div class="border-t pt-4">
        <h2 class="text-xl font-semibold mb-2">Error Details:</h2>
        <div class="stack" v-html="error.stack"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
    },
  },
};
</script>

<style>
.stack pre {
  @apply text-sm text-gray-600 whitespace-pre-wrap;
}
</style>
