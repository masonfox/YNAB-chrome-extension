<template>
    <Slideover storeKey="settings" title="Settings" :visible="visible" position="right">
        <h1>Hello World</h1>
        
        <!-- Clear Storage -->
        <button type="button" @click="clearStorage()" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Clear Storage
        </button>
    </Slideover>
</template>

<script>
import Slideover from './utilities/Slideover.vue'

export default {
    name: 'Settings',
    components: {
        Slideover
    },
    computed: {
        visible () {
            return this.$store.state.slideouts.settings
        }
    },
    methods: {
        clearStorage () {
            // clear storage, close slideout, and finally redirect to budget selection
            this.$storage.clear()
            this.$router.replace({ path: '/budget/select' })
            this.$store.commit('toggleSlideout', 'settings')
        }
    }
}
</script>

<style lang="">
    
</style>