<script setup>
import { useCustomerStore } from '@/stores/customer';
import { reactive, ref, onMounted } from 'vue'
import FormErrors from '@/components/FormErrors.vue'
import AppButton from '@/components/AppButton.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();

const userData = reactive({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
})


const customerStore = useCustomerStore()


async function handleFormSubmit() {
  try {
    await customerStore.addCustomer(userData)
    return router.push({name: 'customers'});
  } catch (error){
    console.error(error)
  }
}

</script>

<template>
   <div class="container mx-auto flex justify-center pb-4">
    <div class="w-full max-w-5xl md:mx-5 px-2">
        <h2 class="text-center text-xl p-2">Customer Add Form</h2>
        <div class="card-bg md:p-8 p-4 w-full max-w-xl mx-auto">
            <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-2 md:gap-4 border-2 p-4 rounded">
            <div class="">
                <p>First Name</p>
                <input
                class="py-1.5 px-2 rounded-md w-full"
                type="text"
                placeholder="First name"
                v-model="userData.first_name"
                required
                />
            </div>

            <div class="">
                <p>Last Name</p>
                <input
                class="py-1.5 px-2 rounded-md w-full"
                type="text"
                placeholder="Last name"
                v-model="userData.last_name"
                required
                />
            </div>

            <div class="">
                <p>Email</p>
                <input
                class="py-1.5 px-2 rounded-md w-full"
                type="email"
                placeholder="Email"
                v-model="userData.email"
                required
                />
            </div>

            <div class="">
                <p>Phone</p>
                <input
                class="py-1.5 px-2 rounded-md w-full"
                type="text"
                placeholder="Customer phone"
                v-model="userData.phone"
                required
                />
            </div>

            <div>
                <p>Address</p>
                <textarea
                    class="col-span-3 w-full rounded-md text-sm p-2"
                    rows="3"
                    v-model="userData.address"
                    required=""
                    style="height: 85px"
                ></textarea>
            </div>

            <div class="text-right py-2">
                <button type="submit" class="text-sm bg-blue-600 text-white px-3 py-2 rounded-md">
                    Submit
                </button>
            </div>
        </form>
        </div>
    </div>
    </div>
</template>
