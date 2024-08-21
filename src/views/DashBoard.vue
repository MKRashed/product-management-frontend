<script setup>
import { onMounted } from 'vue';
import PageTitle from '@/components/sections/PageTitle.vue'
import { useComplainBoxStore } from '@/stores/complain-box'
import { useNoticesStore } from '@/stores/notices'

const complainBoxStore = useComplainBoxStore()
const noticesStore = useNoticesStore()

onMounted(() => {
  complainBoxStore.loadComplainUnreadCount()
  noticesStore.loadNoticeUnreadCount()
})
</script>

<template>
  <div class="container mx-auto flex justify-center pb-5">
    <div class="w-full max-w-5xl md:mx-5 mx-2">
      <div class="flex justify-center items-center py-4">
        <PageTitle />
      </div>
      <div class="w-full flex flex-wrap gap-5 justify-center">
        <RouterLink :to="{ name: 'my-courses' }" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-books"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">My Course</h4>
        </RouterLink>

        <RouterLink :to="{ name: 'my-subscription' }" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-credit-card"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Subscriptions</h4>
        </RouterLink>

        <RouterLink :to="{ name: 'available-batches' }" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-users"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Available Batch</h4>
        </RouterLink>

        <RouterLink :to="{ name: 'my-courses', query: { tab: 'unpaid' } }" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-money-bill-wave"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Pay Now</h4>
        </RouterLink>

        <RouterLink :to="{ name: 'my-notice' }" class="group main-button">
          <div class="main-button-icon relative">
            <i class="fad fa-bells"></i>
            <div v-if="noticesStore.unreadNoticeCounter" class="absolute -top-2 -right-7 bg-red-500 text-white text-sm pt-1 rounded-xl px-2 font-semibold
            ">{{ noticesStore.unreadNoticeCounter }}</div>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Notice</h4>
        </RouterLink>

        <RouterLink :to="{ name: 'my-complain-box' }" class="group main-button">
          <div class="main-button-icon relative">
            <i class="fad fa-user-md-chat"></i>
            <div
              v-if="complainBoxStore.unreadCounter"
              class="absolute -top-2 -right-7 bg-red-500 text-white text-sm pt-1 rounded-xl px-2 font-semibold"
            >
              {{ complainBoxStore.unreadCounter }}
            </div>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Complain Box</h4>
        </RouterLink>

        <a href="https://banglamed.net/" target="_blank" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-book-open"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">Publication</h4>
        </a>

        <RouterLink :to="{ name: 'my-account' }" class="group main-button">
          <div class="main-button-icon">
            <i class="fad fa-address-card"></i>
          </div>
          <h4 class="text-base md:text-xl font-semibold">My Account</h4>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
