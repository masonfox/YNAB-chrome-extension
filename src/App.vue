<template>
    <div id="app">
        <Navbar />
        <router-view class="mt-10" />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'App',
    components: {
        Navbar
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
