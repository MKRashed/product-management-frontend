import { loadApp } from '@/lib/server'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiRoutes from '../lib/api-routes'

export const useAppStore = defineStore('appStore', () => {

    const loading = ref(true)

    const router = ref({})

    const authStore = useAuthStore()

    const data = ref({
        is_logged_in: false,
        user: null,
      })

    function parseCookie(cookies) {

        if (!cookies) return null;
        
        return cookies.map(cookie => {
          return cookie.split(';')[0];
        });
    }
    
    function load_app(appData) {

        data.value = appData;

        return new Promise(async (resolve, reject) => {

            try {
            
            const response = await axios.get(apiRoutes.appData())

            data.value = response.data

            // Accessing cookies from the response headers
            const cookies = response.headers['set-cookie'];
            
            // Parsing cookie values if needed
            const cookieValue = parseCookie(cookies);

            if (data.value?.user) {
                authStore.set_user(data.value?.user)
                authStore.set_is_logged_in(data.value?.is_logged_in)
            }

            resolve(data.value)
            } catch (err) {
            reject(err)
            } finally {
            loading.value = false
            }
        })
    }

    async function load_and_get_is_logged_in() {
        await loadApp()
        const authStore = useAuthStore()
        return !authStore.is_logged_in
    }

    function setRouter(_router) {
        router.value = _router
      }

    return {
        setRouter,
        load_app,
        loading,
        load_and_get_is_logged_in,
    }

})