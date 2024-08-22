<script setup>
import { onMounted } from 'vue';

onMounted(() => {})
</script>

<template>
  <div class="container mx-auto flex justify-center pb-5">
    <div class="w-full max-w-5xl md:mx-5 mx-2">
      <div class="w-full flex flex-wrap gap-5 justify-center">
        <div class="w-full flex flex-wrap gap-5 justify-center p-2">
          <RouterLink :to="{ name: 'products' }" class="group main-button">
            <h4 class="text-base md:text-xl font-semibold">Products</h4>
          </RouterLink>

          <RouterLink :to="{ name: 'customers' }" class="group main-button">
            <h4 class="text-base md:text-xl font-semibold">Customer</h4>
          </RouterLink>

          <RouterLink :to="{ name: 'orders' }" class="group main-button">
            <h4 class="text-base md:text-xl font-semibold">Orders</h4>
          </RouterLink>
      </div>
    </div>
  </div>
  </div>
</template>
