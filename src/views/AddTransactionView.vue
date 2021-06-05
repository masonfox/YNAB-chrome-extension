<template>
  <div>
    <!-- Debit/credit toggle and amount -->
    <div class="form-line">
      <div class="flex justify-between items-center">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <button
          type="button"
          @click="toggleTransactionType()"
          class="relative inline-flex f1ex-shrink-0 h-6 w-2/12 border-2 border-transparent rounded-md cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
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
        <currency-input
          v-model="form.amount"
          class="w-10/12 h-4 text-right text-xl
        font-semibold focus:outline-none"
          :class="[isDebit ? 'text-red-500' : 'text-green-500']"
          :currency="null"
          locale="en"
          :distraction-free="false"
          :valueRange="{ min: 0 }"
          :allow-negative="false"
        />
      </div>
    </div>
    <!-- Payee -->
    <button
      @click="toggleSelectModalVisibility('Payees')"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Payee</span
      >
      <div class="flex justify-end w-3/4 text-base">
        <span v-if="form.payeeId !== null">
          <span>{{ payee.name }}</span>
        </span>
        <span class="flex items-center" v-else>
          <span class="mr-1">Select Payee</span>
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
        </span>
      </div>
    </button>
    <!-- Category -->
    <button
      @click="toggleSelectModalVisibility('Categories')"
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Category</span
      >
      <div class="flex justify-end w-3/4 text-base">
        <span v-if="form.categoryId !== null">
          <span>{{ category.name }}</span>
        </span>
        <span class="flex items-center" v-else>
          <span class="mr-1">Select Category</span>
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
        </span>
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
      <div class="flex justify-end w-3/4 text-base">
        <span v-if="accountId !== null">
          <span>{{ account.name }}</span>
        </span>
        <span class="flex items-center" v-else>
          <span class="mr-1">Select Account</span>
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
        </span>
      </div>
    </button>
    <!-- Date -->
    <button
      class="flex items-center justify-between border-b border-gray-200 px-4 py-2 w-full bg-gray-50 hover:bg-gray-100 focus:outline-none"
    >
      <span class="w-1/4 text-sm text-left font-medium text-gray-700"
        >Date</span
      >
      <div class="flex justify-end w-3/4">
        <!-- <span class="text-base mr-1">March 17th, 2021</span> -->
        <datepicker
          v-model="form.date"
          wrapper-class="datepicker"
          input-class="datepicker-input"
          :format="dateFormatter"
        ></datepicker>
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
        @click="toggleSelectModalVisibility('ClearForm')"
        class="w-2/12 text-center px-4 py-2 mr-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 relative"
          style="right: 4px;"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <button
        @click="submit()"
        class="w-10/12 text-center px-4 py-2 ml-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-0"
      >
        Save Transaction
      </button>
    </div>

    <!-- Input Modals -->
    <SelectModal
      name="Accounts"
      :data="formattedAccounts"
      listStyle="flat"
      v-show="visibleModals.Accounts"
      v-on:select="handleSelect"
      v-on:close-modal="toggleSelectModalVisibility"
    />
    <SelectModal
      name="Payees"
      :data="formattedPayees"
      listStyle="stacked"
      v-show="visibleModals.Payees"
      v-on:select="handleSelect"
      v-on:close-modal="toggleSelectModalVisibility"
    />
    <SelectModal
      name="Categories"
      :data="formattedCategories"
      listStyle="stacked"
      v-show="visibleModals.Categories"
      v-on:select="handleSelect"
      v-on:close-modal="toggleSelectModalVisibility"
    />

    <!-- Regular Modals -->
    <Modal v-show="visibleModals.ClearForm">
      <div>
        <div class="mb-6 text-center">
          <h3 class="font-bold text-base mb-1">Are you sure?</h3>
          <p class="text-sm text-gray-400">
            You'll lose your current information by clearing
          </p>
        </div>
        <div class="flex justify-around">
          <button
            class="text-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-0"
            @click="toggleSelectModalVisibility('ClearForm')"
          >
            Cancel
          </button>
          <button
            class="text-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-0"
            @click="[toggleSelectModalVisibility('ClearForm'), resetForm()]"
          >
            Clear
          </button>
        </div>
      </div>
    </Modal>

    <pre class="mt-5">
        <code>{{ form }}</code>
    </pre>
  </div>
</template>

<script>
// import FormLine from '@/components/utilities/FormLine.vue'
import { CurrencyInput } from "vue-currency-input";
import Modal from "@/components/utilities/Modal.vue";
import SelectModal from "@/components/SelectModal.vue";
import Datepicker from "vuejs-datepicker";
import { ynab, api } from "@/ynab.js";

export default {
  name: "AddTransactionView",
  components: {
    // FormLine,
    CurrencyInput,
    Modal,
    SelectModal,
    Datepicker,
  },
  data() {
    return {
      form: {
        type: "debit", // or credit
        amount: 500,
        categoryId: null,
        payeeId: null,
        cleared: false,
        memo: "",
        date: ynab.utils.getCurrentDateInISOFormat(),
      },
      visibleModals: {
        Accounts: false,
        Payees: false,
        Categories: false,
        ClearForm: false,
      },
    };
  },
  computed: {
    budgetId() {
      return this.$store.state.activeBudgetId;
    },
    accountId() {
      return this.$store.state.accountId;
    },
    budgets() {
      return this.$store.state.budgets;
    },
    payee() {
      return this.$store.getters.getPayeeById(this.form.payeeId);
    },
    payees() {
      return this.$store.getters.currentPayees;
    },
    // returns a single account by id
    account() {
      return this.$store.getters.getAccountById(this.accountId);
    },
    category() {
      return this.$store.getters.getCategoryById(this.form.categoryId);
    },
    categoryGroups() {
      return this.$store.state.categoryGroups;
    },
    categories() {
      return this.$store.state.categories;
    },
    // returns all accounts
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
    formattedPayees() {
      return this.payees.map((payee) => {
        return {
          id: payee.id,
          name: payee.name,
        };
      });
    },
    formattedCategories() {
      return this.categoryGroups.map((categoryGroup) => {
        // rewrite this to handle groupname
        categoryGroup["categories"] = this.categories.filter(
          (category) => category.category_group_id == categoryGroup.id
        );
        return categoryGroup;
      });
    },
    isDebit() {
      return this.form.type == "debit";
    },
    isCleared() {
      return this.form.cleared;
    },
    amountToMilliunits() {
      let miliunits = this.form.amount * 1000; // base conversion
      return this.form.type == "debit" ? miliunits * -1 : miliunits; // flip for debit, leave for credit
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
    handleSelect({ name, id }) {
      let key = null;

      // handle default account id update
      if (name == "Accounts") this.$store.commit("setAccountId", id);

      switch (name) {
        case "Accounts":
          key = "accountId";
          break;
        case "Payees":
          key = "payeeId";
          break;
        case "Categories":
          key = "categoryId";
          break;
      }

      this.handleInput(key, id);
    },
    toggleSelectModalVisibility(name) {
      console.log(name, this.visibleModals);
      this.visibleModals[name] = !this.visibleModals[name];
    },
    dateFormatter(date) {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        months[date.getMonth()] +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear()
      );
    },
    resetForm() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    submit() {
      // validation
      let transaction = {
        account_id: this.accountId,
        category_id: this.form.categoryId,
        payee_id: this.form.payeeId,
        cleared: this.form.cleared ? "cleared" : "uncleared",
        date: this.form.date,
        amount: this.amountToMilliunits,
        memo: this.form.memo,
      };

      api.transactions
        .createTransaction(this.budgetId, { transaction })
        .then((response) => {
          console.log(response);
          this.resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
.form-line {
  @apply border-b border-gray-100 px-4 py-2 bg-white;
}

.vdp-datepicker__calendar {
  position: absolute;
  left: -6.8rem;
  top: 2rem;
}

.datepicker-input {
  background: transparent;
  border: 0;
  text-align: right;
  padding: 0;

  &:focus {
    box-shadow: none;
  }
}
</style>
