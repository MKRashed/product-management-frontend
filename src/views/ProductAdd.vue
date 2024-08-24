<script setup>
import { useProductStore } from '@/stores/product'
import { reactive, ref } from 'vue'
import FormErrors from '@/components/FormErrors.vue'
import AppButton from '@/components/AppButton.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();
const userData = reactive({
  name: '',
  description: '',
  price: '',
})

const productStore = useProductStore()

async function handleFormSubmit() {
  try {
    await productStore.addProduct(userData)
    return router.push({name: 'products'});
  } catch (error){
    console.error(error)
  }
}

</script>

<template>
   <div class="container mx-auto flex justify-center pb-4">
    <div class="w-full max-w-5xl md:mx-5 px-2">
        <h2 class="text-center text-xl p-2">Product Add Form</h2>

        <div class="card-bg md:p-8 p-4 w-full md:w-96 mx-auto">
        <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-2 md:gap-4 border-2 p-4 rounded">
          <div class="">
            <p>Product Name</p>
            <input
              class="py-1.5 px-2 rounded-md w-full"
              type="text"
              placeholder="Product name"
              v-model="userData.name"
              required
            />
          </div>

          <div>
            <p>Description</p>
            <textarea
                class="col-span-3 w-full rounded-md text-sm p-2"
                rows="3"
                v-model="userData.description"
                required=""
                style="height: 85px"
            ></textarea>
          </div>

          <div>
            <p>Price</p>
              <input
                  class="py-1.5 px-2 rounded-md w-full"
                  type="number"
                  placeholder="Price:112.44"
                  v-model="userData.price"
                  required
              />
          </div>

          <div class="text-right py-2">
            <!-- <button
                type="button"
                @click="cancleHandle"
                class="text-sm bg-gray-600 text-white px-3 py-2 rounded-md mr-2"
            >
                Cancel
            </button> -->
            <button type="submit" class="text-sm bg-blue-600 text-white px-3 py-2 rounded-md">
                Submit
            </button>
            </div>

        </form>
      </div>
    </div>
    </div>
</template>
