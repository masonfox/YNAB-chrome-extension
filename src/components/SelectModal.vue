<template>
  <div class="select-modal">
    <!-- header -->
    <header
      class="flex justify-between items-center w-full p-3 bg-gray-100 border-b border-gray-200"
    >
      <button class="text-gray-400 hover:text-gray-500" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <h1 class="text-lg m-l--1 font-bold">{{ name }}</h1>
      <div></div>
    </header>
    <!-- search bar -->
    <div class="">
      <input
        type="text"
        class="w-full text-sm border-0 outline-0 focus:ring-0"
        v-model="filter"
        :placeholder="'Filter ' + name"
      />
    </div>
    <!-- list props data -->
    <nav class="h-full overflow-y-auto" aria-label="Directory">
      <div
        class="relative"
        v-for="(item, key) in formattedData"
        :key="key"
        v-show="hasFilteredData"
      >
        <div
          class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"
        >
          <h3>{{ key }}</h3>
        </div>
        <ul class="relative z-0 divide-y divide-gray-200">
          <li
            class="bg-white"
            @click="handleSelect(subItem.id)"
            v-for="subItem in item"
            :key="subItem.id"
          >
            <div
              class="relative px-6 py-4 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <div class="flex-1 min-w-0">
                <a href="#" class="focus:outline-none">
                  <!-- Extend touch target to entire panel -->
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">
                    {{ subItem.name }}
                  </p>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- if there aren't any items after filter -->
      <div
        class="flex justify-center items-center flex-col text-center border-t border-gray-200 p-5"
        v-show="!hasFilteredData"
      >
        <h2 class="text-base font-bold">Yikes!</h2>
        <p class="text-sm text-gray-500">We didn't find any of those!</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SelectModal",
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => {
        console.log(item);
        return item.name.includes(this.filter);
      });
    },
    hasFilteredData() {
      return this.filteredData.length > 0;
    },
    formattedData() {
      const final = {};

      // filtered data is retrieved from computed property above
      for (let index = 0; index < this.filteredData.length; index++) {
        const element = this.data[index];
        let firstCharName = element.name.charAt(0);

        // create new key and array if new
        if (!Object.prototype.hasOwnProperty.call(final, firstCharName))
          final[firstCharName] = [];

        // handle new and existing update
        final[firstCharName].push(element);

        console.log(`Added ${element.name} to ${firstCharName.toUpperCase()}`);
      }

      console.log("FINAL", final);

      return final;
    },
  },
  methods: {
    handleSelect(id) {
      console.log(`User selected ${id} in the ${this.name} modal`);
      this.close();
    },
    close() {
      this.$emit("close-modal", this.name);
      // return to top
    },
  },
};
</script>

<style lang="scss">
.select-modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
}
</style>
