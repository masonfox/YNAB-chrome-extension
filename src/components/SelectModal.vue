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
            d="M15 19l-7-7 7-7"
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
        class="w-full text-sm border-0 outline-0 focus:ring-0 px-4"
        v-model="filter"
        :placeholder="'Filter ' + name"
      />
    </div>
    <!-- list props data -->
    <nav class="h-full overflow-y-auto" aria-label="Directory">
      <!-- data structure is different -->
      <div v-if="name !== 'Categories'">
        <div v-if="listStyle == 'stacked' && hasFilteredData">
          <div class="relative" v-for="(item, key) in formattedData" :key="key">
            <div
              class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-500"
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
                  class="relative px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
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
        </div>
        <!-- flat list render -->
        <div
          v-if="listStyle == 'flat' && hasFilteredData"
          class="border-t border-gray-200"
        >
          <ul class="relative z-0 divide-y divide-gray-200">
            <li
              class="bg-white"
              @click="handleSelect(item.id)"
              v-for="item in formattedData"
              :key="item.id"
            >
              <div
                class="relative px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              >
                <div class="flex-1 min-w-0">
                  <a href="#" class="focus:outline-none">
                    <!-- Extend touch target to entire panel -->
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.name }}
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
      </div>

      <!-- if it is the category modal -->
      <div v-else>
        <div
          class="relative"
          v-for="categoryGroup in data"
          :key="categoryGroup.id"
        >
          <div
            class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-500"
          >
            <h3>{{ categoryGroup.name }}</h3>
          </div>
          <ul class="relative z-0 divide-y divide-gray-200">
            <li
              class="bg-white"
              @click="handleSelect(category.id)"
              v-for="category in categoryGroup.categories"
              :key="category.id"
            >
              <div
                class="relative px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              >
                <div class="flex-1 min-w-0">
                  <a href="#" class="focus:outline-none">
                    <!-- Extend touch target to entire panel -->
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm font-medium text-gray-900">
                      {{ category.name }}
                    </p>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
    listStyle: {
      type: String,
      validator: (value) => {
        // flat lists all items, stacked sorts them by alphabetical
        // and then places them under those sticky headers
        return ["flat", "stacked"].includes(value);
      },
    },
  },
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    filteredData() {
      // BUG: doesn't seem to be filtering appropriately
      // BUG: sort doesn't want to work
      return [...this.data]
        .sort((a, b) => {
          return b.name < a.name;
        })
        .filter((item) => {
          return item.name.toLowerCase().includes(this.filter.toLowerCase());
        });
    },
    hasFilteredData() {
      return this.filteredData.length > 0;
    },
    formattedData() {
      return this.listStyle == "flat" ? this.flatList : this.stackedList;
    },
    flatList() {
      return this.filteredData;
    },
    stackedList() {
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
      }

      return final;
    },
  },
  methods: {
    handleSelect(id) {
      this.$emit("select", {
        name: this.name,
        id,
      });
      this.close();
    },
    close() {
      this.filter = "";
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
