<template>
  <button
    type="button"
    @click="$emit('toggle')"
    class="relative inline-flex f1ex-shrink-0 h-6 w-2/12 border-2 border-transparent rounded-md cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
    :class="[active ? 'bg-red-500' : 'bg-green-500']"
    aria-pressed="false"
  >
    <span class="sr-only">Use setting</span>
    <span
      class="translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-md bg-white shadow transform ring-0 transition ease-in-out duration-200"
      :class="[active ? 'translate-x-0' : 'translate-x-5']"
    >
      <span
        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
        aria-hidden="true"
        :class="[
          active
            ? 'opacity-100 ease-in duration-200'
            : 'opacity-0 ease-out duration-100',
        ]"
      >
        <svg
          class="bg-white h-4 w-4 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </span>
      <span
        class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
        aria-hidden="true"
        :class="[
          active
            ? 'opacity-0 ease-out duration-100'
            : 'opacity-100 ease-in duration-200',
        ]"
      >
        <svg
          class="bg-white h-4 w-4 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </span>
    </span>
  </button>
</template>

<script>
export default {
  name: "ToggleIcon",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style></style>
