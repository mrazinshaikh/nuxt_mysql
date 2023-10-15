<template>
  <div class="loading mt-4 text-xl text-center tracking-wider">Loging out</div>
</template>

<script>
export default {
  name: "Logout",
  setup() {
    definePageMeta({
      layout: 'guest'
    })
    onMounted(() => {
      // setTimeout(() => {
        useNuxtApp().$user.logout();
      // }, 2000);
    });
  },
};
</script>

<style>
.loading:after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
}
</style>
