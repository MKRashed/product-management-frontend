<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    data: {type: Object},
});

</script>


<template>
    <div class="grid grid-cols-4 border divide-x-2">
        <div class="p-2 flex items-center justify-center">{{ data.name }}</div>
        <div class="p-2 flex items-center justify-center">{{ data.description }}</div>
        <div class="p-2 flex items-center justify-center">{{ data.price }}</div> 
        <div class="p-2 flex items-center justify-center">
            <RouterLink :to="{ name: 'product-edit', params:{ id:data.id } }" class="group main-button btn-2">
                <h4 class="text-base font-semibold"> Edit Product </h4>
            </RouterLink>
        </div> 

    </div>
</template>