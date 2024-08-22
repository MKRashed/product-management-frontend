<script setup>
import AppButton from "@/components/AppButton.vue";
import FormErrors from "@/components/FormErrors.vue";
import { useAuthStore } from "@/stores/auth";
import { AxiosError } from "axios";
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const authStore = useAuthStore();

const userData = reactive({
  name: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const email = ref("");
const state = ref("");

const router = useRouter();
const loginErrors = ref({});
const loginMessage = ref("");

async function handleFormSubmit() {
  try {
    state.value = "requesting";
    console.log({ userData });
    let data = {};
    if (email.value) {
      data = { ...userData, ...{ email: email.value } };
    } else {
      data = { ...userData };
    }
    const registerInfo = await authStore.register(data);
    loginErrors.value = {};
    state.value = "done";
    router.push({ name: "login" });
    if (registerInfo) {
      console.log({ registerInfo });
    }
  } catch (err) {
    state.value = "error";
    if (err instanceof AxiosError) {
      loginErrors.value = err?.response?.data?.errors || {};
      loginMessage.value = err?.response?.data?.message || "";
    }
  }
}
</script>

<template>
  <section class="container mx-auto md:py-8 py-4">
    <div class="flex flex-col items-center gap-4 px-4">
      <div class="text-center">
        <h2 class="title-xl">Signup</h2>
      </div>
      <div class="card-bg md:p-8 p-4 w-full md:w-96">
        <div class="text-rose-700 mb-3" v-if="loginMessage">
          {{ loginMessage }}
        </div>
        <form
          @submit.prevent="handleFormSubmit"
          class="flex flex-col gap-2 md:gap-4"
        >
          <div class="">
            <input
              class="px-3 py-1 rounded-md w-full"
              type="text"
              placeholder="Your full name"
              v-model="userData.name"
            />
            <FormErrors
              class="text-rose-600 italic"
              :errors="loginErrors.name"
            />
          </div>

          <div class="">
            <input
              class="px-3 py-1 rounded-md w-full"
              type="text"
              placeholder="Phone : 01XXXXXXXXX"
              v-model="userData.phone"
            />
            <FormErrors
              class="text-rose-600 italic"
              :errors="loginErrors.phone"
            />
          </div>

          <div class="">
            <input
              class="px-3 py-1 rounded-md w-full"
              type="text"
              placeholder="Email"
              v-model="email"
            />
            <FormErrors
              class="text-rose-600 italic"
              :errors="loginErrors.email"
            />
          </div>
          <div class="">
            <input
              class="px-3 py-1 rounded-md w-full"
              type="password"
              placeholder="Password"
              v-model="userData.password"
            />
            <FormErrors
              class="text-rose-600 italic"
              :errors="loginErrors.password"
            />
          </div>

          <div class="">
            <input
              class="px-3 py-1 rounded-md w-full"
              type="password"
              placeholder="Confirm password"
              v-model="userData.password_confirmation"
            />
            <FormErrors
              class="text-rose-600 italic"
              :errors="loginErrors.password_confirmation"
            />
          </div>

          <div class="text-center">
            <!-- :loading="state == 'requesting'" -->
            <AppButton type="btn-2"  block>
              <p class="">Submit</p>
            </AppButton>
          </div>

          <hr class="" />
          <div class="text-center">
            <p class="pb-1">Already have an account?</p>
            <router-link class="btn-1" to="/login">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
