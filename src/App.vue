<script setup>
import { loadApp } from '@/lib/server'
import { useAppStore } from '@/stores/app';
import { onMounted, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const appStore = useAppStore()
const { setRouter } = appStore

onMounted(async () => {

  setRouter(router)

  await loadApp()

  loading.value = false
  
})

watch( () => route.path,
  () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
)

</script>

<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div class="flex-grow">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
