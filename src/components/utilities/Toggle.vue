<template>
  <button
    @click="$emit('toggle')"
    class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
  >
    <span class="w-1/4 text-sm text-left font-medium text-gray-700"
      >Cleared</span
    >
    <div class="flex justify-end w-3/4">
      <button
        type="button"
        class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
        aria-pressed="false"
        :class="[active ? 'bg-green-500' : 'bg-gray-400']"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          :class="[active ? 'translate-x-5' : 'translate-x-0']"
        ></span>
      </button>
    </div>
  </button>
</template>

<script>
export default {
  name: "Toggle",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style></style>
