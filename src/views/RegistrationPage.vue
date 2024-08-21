<script setup>
import {ref, reactive, watch} from 'vue';
import {useAuthStore} from '@/stores/auth'
import FormErrors from '@/components/FormErrors.vue'
import {RouterLink, useRouter} from 'vue-router'
import {AxiosError} from "axios";
import AppButton from '@/components/AppButton.vue';

const authStore = useAuthStore()

const userData = reactive({
  name: '',
  phone: '',
  medical_college_id: '',
  bmdc_no: '',
  password: '',
  password_confirmation: '',
})

const email = ref('')
const has_permanent_bmdc = ref(null);
const bmdc_input = ref(null);
const state = ref('');

const router = useRouter();
const loginErrors = ref({})
const loginMessage = ref('')

async function handleFormSubmit() {

  try {

    state.value = 'requesting';

    console.log({userData})

    let data = {};

    if( email.value ) {
      data = { ...userData, ...{ email: email.value } }
    }else {
      data = { ...userData }
    }

    const registerInfo = await authStore.register( data );

    loginErrors.value = {};

    state.value = 'done';

    router.push({name:'login'});

    /**
     * Successful request will be redirected to otp verification route
     */
    if( registerInfo ) {


      console.log({ registerInfo })
/*      await router.push({
        name: 'otp-verification',
        query: { next: route.query.next },
      });*/
    }

  } catch (err) {

    state.value = 'error';
    /**
     * When error occurred in URI or any Error not AxiosError
     * then it will be redirected to 'my-dashboard'
     * Otherwise will be shown the error messages
     */
    if( err instanceof AxiosError ) {
      loginErrors.value = err?.response?.data?.errors || {}
      loginMessage.value = err?.response?.data?.message || ''
    }
  }
}


function set_has_permanent_bmdc(text){
  has_permanent_bmdc.value=text;

  if( text === 'yes') {
    userData.bmdc_no = "";

    setTimeout(
      () => {
        bmdc_input.value.focus()
      }, 0
    )
  } else {
    userData.bmdc_no = userData.phone;
    watch( () => userData.phone, (phone) => {
      userData.bmdc_no = phone;
    })
  }
}

</script>

<template>
  <section class="container mx-auto md:py-8 py-4">
    <div class="flex flex-col items-center gap-4 px-4">
      <div class="text-center">
        <h2 class="title-xl">
          Signup
         </h2>
      </div>
      <div class="card-bg md:p-8 p-4 w-full md:w-96">
        <div class="text-rose-700 mb-3" v-if="loginMessage">{{ loginMessage }}</div>
        <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-2 md:gap-4">


          <div class="">
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="fal fa-user"></i>
              </div>
              <input
                class="pl-12 rounded-md w-full"
                type="text"
                placeholder="Your full name"
                v-model="userData.name"
              />
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.name" />
          </div>

          <div class="">
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-1.5 bg-gray-100 ml-[1px] rounded-l-md">
                +88
              </div>
              <input
                class="pl-12 rounded-md w-full"
                type="text"
                placeholder="Phone : 01XXXXXXXXX"
                v-model="userData.phone"
              />
            </div>
            <FormErrors
                class="text-rose-600 italic"
                :errors="loginErrors.phone"
            />
          </div>

          <div class="">
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="fal fa-at"></i>
              </div>
              <input
                class="pl-12 rounded-md w-full"
                type="text"
                placeholder="Email (Optional)"
                v-model="email"
              />
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.email" />
          </div>

      
          <div class="">
            <div class="text-center text-purple-900 mb-3 flex items-center gap-1 justify-between">
              <div class="font-bold text-sm md:text-base">Got permanent BMDC?</div>
              <div class="grid gap-1 grid-cols-2">
                <button :class="has_permanent_bmdc === 'yes' ? `!bg-green-600 !text-white !border-green-600 btn-3` : `btn-3`" @click.prevent="set_has_permanent_bmdc('yes')">Yes</button>
                <button :class="has_permanent_bmdc === 'no' ? `!bg-green-600 !text-white !border-green-600 btn-3` : `btn-3`" @click.prevent="set_has_permanent_bmdc('no')">No</button>
              </div>
            </div>


            <div class="relative flex flex-row items-center" v-if="has_permanent_bmdc !== null">
              <div class="absolute p-2 px-4 bg-gray-100 ml-[1px] rounded-l-md" v-if="has_permanent_bmdc==='yes'">
                A
              </div>
              <div class="absolute p-2 px-4 text-gray-600 bg-gray-100 ml-[1px] rounded-l-md" v-else>
                <i class="fas fa-exclamation"></i>
              </div>
              <input
                  class="pl-12 rounded-md w-full disabled:bg-gray-300 disabled:border-gray-600"
                  type="text"
                  :placeholder="has_permanent_bmdc === 'no' ? ``:`BMDC`"
                  :disabled="has_permanent_bmdc === 'no'"
                  ref="bmdc_input"
                  v-model="userData.bmdc_no"
              />
              <div v-if="has_permanent_bmdc==='no'" class="text-sm text-red-500 absolute text-right right-1 w-1/2">
                Use phone as BMDC
              </div>
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.bmdc_no" />
          </div>

          <div class="">
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="fad fa-key"></i>
              </div>
              <input
                  class="pl-12 rounded-md w-full"
                  type="password"
                  placeholder="Password"
                  v-model="userData.password"
              />
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.password" />
          </div>

          <div class="">
            <div class="relative flex flex-row items-center">
              <div class="absolute p-2 px-3 bg-gray-100 ml-[1px] rounded-l-md">
                <i class="far fa-key"></i>
              </div>
              <input
                  class="pl-12 rounded-md w-full"
                  type="password"
                  placeholder="Confirm password"
                  v-model="userData.password_confirmation"
              />
            </div>
            <FormErrors class="text-rose-600 italic" :errors="loginErrors.password_confirmation" />
          </div>



          <div class=" text-center">

            <AppButton type="btn-2" :loading="state == 'requesting'" block>
              <p class="">Submit</p>
              <i class="far fa-arrow-right"></i>
            </AppButton>

          </div>

          <hr class="" />
          <div class=" text-center">
            <p class="pb-1">Already have an account?</p>
            <router-link class="btn-1" to="/login">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
