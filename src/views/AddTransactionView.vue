<template>
  <div>
    <!-- Debit/credit toggle and amount -->
    <div class="form-line">
      <div class="flex justify-between items-center">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <button
          type="button"
          @click="toggleTransactionType()"
          class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-md cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
          :class="[isDebit ? 'bg-red-500' : 'bg-green-500']"
          aria-pressed="false"
        >
          <span class="sr-only">Use setting</span>
          <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
          <span
            class="translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-md bg-white shadow transform ring-0 transition ease-in-out duration-200"
            :class="[isDebit ? 'translate-x-0' : 'translate-x-5']"
          >
            <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
            <span
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              aria-hidden="true"
              :class="[
                isDebit
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
            <!-- Enabled: "opacity-100 ease-in duration-200", Not Enabled: "opacity-0 ease-out duration-100" -->
            <span
              class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
              aria-hidden="true"
              :class="[
                isDebit
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
        <input
          type="text"
          v-model="form.amount"
          class="w-24 h-4 text-right text-lg font-semibold focus:ring-0 border-0"
          :class="[isDebit ? 'text-red-500' : 'text-green-500']"
        />
      </div>
    </div>
    <!-- Payee -->
    <button
      @click="thing"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Payee</span
      >
      <div class="flex items-center justify-end w-3/4">
        <span class="text-base mr-1">Selected Payee</span>
        <!-- chevron right -->
        <svg
          class="relative h-4 w-4 ml-.05 text-gray-400"
          style="top: 1px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
    <!-- Category -->
    <button
      @click="thing"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Category</span
      >
      <div class="flex items-center justify-end w-3/4">
        <span class="text-base mr-1">Selected Category</span>
        <!-- chevron right -->
        <svg
          class="relative h-4 w-4 ml-.05 text-gray-400"
          style="top: 1px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
    <!-- Account -->
    <button
      @click="toggleSelectModalVisibility('Accounts')"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Account</span
      >
      <div class="flex items-center justify-end w-3/4">
        <span class="text-base mr-1">Selected Account</span>
        <!-- chevron right -->
        <svg
          class="relative h-4 w-4 ml-.05 text-gray-400"
          style="top: 1px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
    <!-- Date -->
    <button
      @click="thing"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Date</span
      >
      <div class="flex justify-end w-3/4">
        <span class="text-base mr-1">March 17th, 2021</span>
      </div>
    </button>

    <div class="block px-4 py-2 w-full mt-5">
      <p class="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Optional
      </p>
    </div>
    <!-- Memo -->
    <div
      class="flex items-center justify-between border-b border-t border-gray-200 w-full"
    >
      <textarea
        rows="4"
        class="text-sm w-full border-0 bg-gray-50 focus:ring-0 px-4 py-2 resize-none"
        v-model="form.memo"
        placeholder="Write a memo..."
      ></textarea>
    </div>
    <!-- Cleared -->
    <button
      @click="toggleCleared()"
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
          :class="[isCleared ? 'bg-green-500' : 'bg-gray-400']"
        >
          <span class="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            :class="[isCleared ? 'translate-x-5' : 'translate-x-0']"
          ></span>
        </button>
      </div>
    </button>

    <div class="flex items-center justify-center mt-4 px-4">
      <button
        @click="submit()"
        class="w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-0"
      >
        Save Transaction
      </button>
    </div>

    <!-- Input Modals -->
    <SelectModal
      name="Accounts"
      :data="formattedAccounts"
      v-show="visibleModals.Accounts"
      v-on:close-modal="toggleSelectModalVisibility"
    />

    <!-- <pre class="mt-5">
        <code>{{ form }}</code>
    </pre> -->
  </div>
</template>

<script>
// import FormLine from '@/components/utilities/FormLine.vue'
import SelectModal from "@/components/SelectModal.vue";

export default {
  name: "AddTransactionView",
  components: {
    // FormLine,
    SelectModal,
  },
  data() {
    return {
      form: {
        type: "debit", // or credit
        amount: 1000.0,
        categories: [],
        budgetId: null,
        payeeId: null,
        accountId: null,
        cleared: false,
        memo: "",
        date: null,
      },
      visibleModals: {
        Accounts: true,
      },
    };
  },
  computed: {
    // getBudgetById() {

    // },
    budgets() {
      return this.$store.state.budgets;
    },
    // getPayeeById() {

    // },
    // payees() {

    // },
    // getAccountById() {

    // },
    accounts() {
      return this.$store.state.accounts;
    },
    formattedAccounts() {
      return this.accounts.map((account) => {
        return {
          id: account.id,
          name: account.name,
        };
      });
    },
    // getCategories() {

    // },
    // getCategoriesByIds() {

    // }
    isDebit() {
      return this.form.type == "debit";
    },
    isCleared() {
      return this.form.cleared;
    },
  },
  methods: {
    toggleTransactionType() {
      this.form.type = this.form.type == "debit" ? "credit" : "debit";
    },
    toggleCleared() {
      this.form.cleared = !this.form.cleared;
    },
    handleInput(key, val) {
      this.form[key] = val;
    },
    toggleSelectModalVisibility(name) {
      console.log(name, this.visibleModals);
      this.visibleModals[name] = !this.visibleModals[name];
    },
    thing() {
      alert("woot");
    },
    submit() {
      // validation

      console.log(this.form);
    },
  },
};
</script>

<style lang="scss">
.form-line {
  @apply border-b border-gray-100 px-4 py-2 bg-white;
}
</style>
