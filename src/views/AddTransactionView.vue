<template>
    <div>
        <h1>hello world</h1>
    </div>
</template>

<script>
export default {
    name: 'AddTransactionView',
    data () {
        return {
            form: {
                type: 'debit', // or credit
                amount: 0.00,
                categories: [],
                budgetId: null,
                payeeId: null,
                accountId: null,
                cleared: false
            },
        }
    },
    computed: {
        getBudgetById () {

        },
        getBudgets () {

        },
        getPayeeById () {
            
        },
        getPayees () {

        },
        getAccountById () {

        },
        getAccounts () {

        },
        getCategories () {

        },
        getCategoriesByIds () {

        }
    }
}
</script>

<style lang="scss">
    
</style>