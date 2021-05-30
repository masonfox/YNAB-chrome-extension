<template>
    <div class="absolute inset-0 z-30 overflow-hidden">
            <section class="absolute inset-y-0 left-0 max-w-full flex">
                <div class="w-screen max-w-md">
                    <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                        <div class="px-4 sm:px-6">
                            <h1>Hello</h1>
                        </div>
                        <div class="mt-6 relative flex-1 px-4 sm:px-6">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </section>
        </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        visible: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        
    }
}
</script>