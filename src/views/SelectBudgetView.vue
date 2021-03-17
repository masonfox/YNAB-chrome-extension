<template>
    <div class="relative h-full flex flex-col items-center">
        <div class="text-center px-2 pt-7 pb-7">
            <i class="text-4xl">🎉</i>
            <h1 class="text-2xl mt-2 mb-.5 font-bold">Welcome!</h1>
            <p class="text-base text-gray-700 font-normal">Select your budget to get started!</p>
        </div>
        <!-- budget selector -->
        <div class="block w-full pb-10">
            <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" -->
            <div class="relative border p-4 flex cursor-pointer bg-gray-50 hover:bg-white focus:bg-white" v-for="budget in budgets" :key="budget.id" @click="budgetId = budget.id">
                <div class="flex items-center h-5">
                    <input type="radio" :value="budget.id" v-model="budgetId" class="radio-input">
                </div>
                <label for="settings-option-0" class="ml-3 flex flex-col block text-sm font-medium">
                    {{ budget.name }}
                </label>
            </div>
        </div>
        <!-- footer -->
        <div class="fixed bottom-0 flex justify-end items-center h-10 text-right w-full bg-white border-t border-gray-200">
            <button type="button" @click="next()" class="inline-flex items-center px-4 h-10 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" :disabled="!hasBudgetId">
                <span>Next</span>
                <svg class="ml-1 -mr-1 h-4 w-4" style="margin-top: .15rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectBudgetView',
    data () {
        return {
            budgetId: null
        }
    },
    computed: {
        budgets () {
            return this.$store.state.budgets
        },
        hasBudgetId () {
            return this.budgetId !== null
        }
    },
    methods: {
        next() {
            if (this.hasBudgetId) {
                // set the active budget id
                this.$store.commit('setActiveBudget', this.budgetId)
                // route to home
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .radio-input {
        @apply focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300;
    }

    button:disabled {
        @apply bg-gray-200;
    }
</style>