<template>
    <div v-show="visible">
        <transition name="fade">
            <div class="absolute inset-0 bg-black h-full w-full bg-opacity-75 z-20 overflow-hidden"></div>
        </transition>
        <div class="absolute inset-0 z-30 overflow-hidden">
            <section class="absolute inset-y-0 left-0 max-w-full flex" :class="[ position == 'left' ? 'pr-10' : 'pl-10' ]" aria-labelledby="slide-over-heading">
            <!--
                Slide-over panel, show/hide based on slide-over state.

                Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-full"
                To: "translate-x-0"
                Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
                <div class="w-screen max-w-md">
                    <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                        <div class="px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <div class="flex flex-col">
                                    <h2 class="text-xl font-medium text-gray-900">
                                        {{ title }}
                                    </h2>
                                    <p class="text-xs text-gray-400" v-if="subtitle">{{ subtitle }}</p>
                                </div>
                                <div class="ml-3 h-7 flex items-center">
                                    <button class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="toggleVisibility()">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 relative flex-1 px-4 sm:px-6">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slideover',
    props: {
        storeKey: {
            required: true,
            type: String
        },
        title: {
            required: true,
            type: String
        },
        subtitle: {
            type: String
        },
        position: {
            default: 'left',
            type: String
        },
        visible: {
            required: true,
            type: Boolean
        }
    },
    data () {
        return {
            toggleVisibility() {
                this.$store.commit('toggleSlideout', this.storeKey)
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
    
</style>