<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, } from 'vue';
const authStore = useAuthStore()
const user = computed(() => {
  return authStore?.authData;
})

onMounted(() => {})
</script>

<template>
  <div class="container mx-auto flex justify-center pb-5">
    <div class="w-full max-w-5xl md:mx-5 mx-2">
      <div class="text-center p-2 font-bold text-blue-500 text-xl">
         <span>Welcome</span> {{ user.name }}
      </div>
      <div class="w-full flex flex-wrap gap-5 justify-center">
      <div>
        <router-view>
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
        </router-view>
      </div>
    </div>
  </div>
  </div>
</template>
