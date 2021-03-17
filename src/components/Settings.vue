<template>
    <Slideover storeKey="settings" title="Settings" :visible="visible" position="right">
        <h1>Hello World</h1>
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
    }
}
</script>

<style lang="">
    
</style>