<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive, ref } from 'vue'
import FormErrors from '@/components/FormErrors.vue'
import { RouterLink,useRouter, useRoute } from 'vue-router'
import {loadApp} from "@/lib/server";
import {AxiosError} from "axios";
import AppButton from '@/components/AppButton.vue';

const authStore = useAuthStore()
const router = useRouter();
const route = useRoute();

const username = ref();
const password = ref();
const showPassword = ref(false);

const userData = reactive({
  username: route.query.phone,
  password: ''
})

const loginErrors = ref({})
const loginMessage = ref('')

async function handleFormSubmit() {

  try {

    await authStore.login( userData );

    /**
     * Successful login will be redirected to next route
     * if next is empty the redirected to `dashboard`
     */
    await router.push(
      route.query.next
        ? JSON.parse(decodeURI( route.query.next ))
        : { name: 'my-dashboard' }
    )

  } catch (err) {
    /**
     * When error occurred in URI or any Error not AxiosError
     * then it will be redirected to 'my-dashboard'
     * Otherwise will be shown the error messages
     */
    if( err instanceof AxiosError ) {
      loginErrors.value = err?.response?.data?.errors || {}
      loginMessage.value = err?.response?.data?.message || ''
    } else {
      await router.push({ name: 'my-dashboard'})
    }
  }
}

onMounted(async () => {

  if( route.query.phone ) {
    password.value.focus()
  } else {
    username.value.focus()
  }

  await loadApp( );



  if( authStore.is_logged_in ) {
    await router.push({ name: 'my-dashboard'})
  }

})
</script>

<template>
  <section class="container mx-auto py-8">
    <div class="flex flex-col items-center gap-4 px-4">
      <div class="text-center">
        <h2 class="title-xl">
          Sign in to <br class="md:hidden" />
          GENESIS
        </h2>
      </div>
      <div class="card-bg md:p-8 p-4 w-full md:w-96">
        <div class="text-rose-700 mb-3" v-if="loginMessage">{{ loginMessage }}</div>
        <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-2 md:gap-4">

          <div
            class="text-green-400 text-sm font-semibold"
            v-if="route.query['referer-message']"
          >
            {{route.query['referer-message']}}
          </div>

          <div class="">
            <p>BMDC / Phone</p>
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="fal fa-user"></i>
              </div>
              <input
                class="pl-12 rounded-md w-full"
                type="text"
                placeholder="User ID / BMDC"
                v-model="userData.username"
                :readonly="route.query.phone"
                ref="username"
                required
              />

              <div class="absolute right-0 p-2 px-3 mr-[1px] rounded-r-md text-green-500 bg-green-50"
                   v-if="route.query.phone"
              >
                <i class="fas fa-check"></i>
              </div>

            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.username" />
          </div>

          <div class="">
            <p>Password</p>
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="fal fa-lock"></i>
              </div>
              <input
                class="pl-12 rounded-md w-full"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                v-model="userData.password"
                ref="password"
              />
              <button type="button" @click="showPassword = !showPassword" class=" -ml-7"> 
                <i class="far" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.password" />
          </div>

          <div class="mt-4 text-center">

            <AppButton type="btn-2" :loading="authStore.logging_in" block>
              <i class="far fa-user-unlock"></i>
              <p class="">Login</p>
            </AppButton>

          </div>

          <div class="flex flex-col items-center text-center">
            <RouterLink to="/forget" class="btn-link">Forgot your password?</RouterLink>
          </div>
           

          <hr class="" />
          <div class=" text-center">
            <p class="pb-1">New to GENESIS?</p>
            <router-link class="btn-1" to="/register">Register Now</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
