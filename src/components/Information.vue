<template>
    <Slideover storeKey="information" title="Information" subtitle="About this extension" :visible="visible">
        <h1>Hello World</h1>
    </Slideover>
</template>

<script>
import Slideover from './utilities/Slideover.vue'

export default {
    name: 'Information',
    components: {
        Slideover
    },
    computed: {
        visible () {
            return this.$store.state.slideouts.information
        }
    }
}
</script>
<style lang="">
    
</style>