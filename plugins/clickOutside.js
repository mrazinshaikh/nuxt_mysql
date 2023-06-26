import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          if (typeof binding.value === 'function') {
            binding.value(event);
            return;
          }
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  });
})


/**
 * Usage: 
 * <ELEMENT v-click-outside="CALLABLE"></ELEMENT>
 * 
 * Ex:
 * <div v-click-outside="() => $emit('close')"></div>
 */