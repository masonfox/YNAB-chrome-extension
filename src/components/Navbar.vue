<template>
    <div>
        <!-- Navbar -->
        <div class="navbar-container">
            <!-- Info button -->
            <button type="button" class="button" @click="toggleSlideout('information')">
                <span class="sr-only">Open information modal</span>
                <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <h1 class="text-base font-medium text-white">YNAB Transactions</h1>
            <button type="button" class="button" @click="toggleSlideout('settings')">
                <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
        <!-- Slideouts -->
        <Information />
        <Settings />
    </div>
</template>

<script>
import Information from '@/components/Information'
import Settings from '@/components/Settings'

export default {
    name: 'Navbar',
    components: {
        Information,
        Settings
    },
    methods: {
        toggleSlideout(key) {
            this.$store.commit('toggleSlideout', key)
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar-container {
        @apply fixed top-0 z-10 h-10 w-full bg-indigo-600 border-b border-gray-200 px-2 flex items-center justify-between;
    }

    .button {
        @apply inline-flex items-center justify-center p-1 rounded-md text-gray-200 hover:text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
    }
</style>