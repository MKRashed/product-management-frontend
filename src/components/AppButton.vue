<script setup>

    defineProps({
        loading: {type: Boolean, default: false},
        type: {type: String, required: true},
        block: {type: Boolean, default: false }
    })

</script>

<template>
    <button :disabled="loading" class="disabled:opacity-50"  :class="`${type} ${block? 'w-full':''}`">
        <p v-if="loading">
            <i class="fad fa-spinner-third animate-spin "></i>
        </p>
        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>