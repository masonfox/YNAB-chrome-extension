<template>
    <div id="app">
        <Navbar />
        <router-view class="mt-10" />
        <!-- <Information /> -->
        <!-- <button @click="clearStorage()">Clear Storage</button> -->
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// import Information from '@/components/Information'

export default {
    name: 'App',
    components: {
        Navbar,
        // Information
    },
    methods: {
        clearStorage () {
            this.$storage.clear()
        }
    }
}
</script>

<style>
#app {
    width: 300px;
    height: 465px;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
