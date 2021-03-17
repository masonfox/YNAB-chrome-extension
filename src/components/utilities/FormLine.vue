<template>
    <button class="flex items-center border-b border-gray-100 px-4 py-2 bg-gray-50">
        <label :for="label" class="w-1/3 text-sm font-medium text-gray-700">{{ label }}</label>
        <slot />
    </button>
</template>

<script>
export default {
    name: 'FormLine',
    props: {
        label: {
            required: true,
            type: String
        }
    }
}
</script>