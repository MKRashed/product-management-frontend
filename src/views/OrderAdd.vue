<script setup>
import { useOrderStore } from '@/stores/order';
import { computed, onMounted, reactive, ref } from 'vue'
import FormErrors from '@/components/FormErrors.vue'
import AppButton from '@/components/AppButton.vue';
import { storeToRefs } from 'pinia';
import Multiselect from '@vueform/multiselect'


const orderStore = useOrderStore()

const { customers, products, custom_products } = storeToRefs(orderStore)

const userData = reactive({
    items: [],
    customer_id: '',
    status:0,
    total_amount:'',
    selectedItem:[
        {
            item:'',
            quantity:'',

        }
    ],
    quantity:'',
})


const selectedValue = ref(null);

onMounted( async () => {
     await orderStore.createOrders();
})

const selectedProducts = computed(() => {
  return products.value.filter(product => userData.items.some(selected => selected === product.id));

});

async function handleProduct(selectedItem) {

    console.log('selectedItem', selectedItem);
    
    
}

async function handleFormSubmit() {
  try {
    await useOrderStore.addOrder(userData)
    // return router.push({name: 'customers'});
  } catch (error){
    console.error(error)
  }
}

</script>

<template>
   <div class="container mx-auto flex justify-center pb-4">
    <div class="w-full max-w-5xl md:mx-5 px-2">
        <h2 class="text-center text-xl p-2">Add Form</h2>
        <div class="card-bg md:p-8 p-4 w-full max-w-xl mx-auto">
            <form @submit.prevent="handleFormSubmit" class="flex flex-col gap-2 md:gap-4 border-2 p-4 rounded">
            <div class="">
                <p>Customer</p>
                <select
                    class="col-span-3 w-full rounded-md text-sm p-2"
                    required="required"
                    name="courier_division_id"
                    v-model="userData.customer_id"
                >
                    <option value="" selected="selected">Select Customer</option>
                    <option :value="customer.id" v-for="customer in customers" :key="customer.id">
                    {{ customer.first_name }} {{ customer.last_name }}
                    </option>
                </select>
            </div>

            {{ selectedProducts }}

            <div class="">
                <p>Orders</p>
                <Multiselect
                    v-model="userData.items"
                    :options="custom_products"
                    label="label"
                    track-by="id"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    />
            </div>

            <div>
                <div v-if="selectedProducts.length">
                <h3>Selected Product Details:</h3>
                <ul>
                    <li v-for="product in selectedProducts" :key="product.id">
                        <p><strong>ID:</strong> {{ product.id }}</p>
                        <p><strong>Name:</strong> {{ product.name }}</p>
                        <p><strong>Description:</strong> {{ product.description }}</p>
                        <p><strong>Price:</strong> {{ product.price }}</p>
                        <div>
                            <input type="text" v-model="userData.quantity">
                            <button class="btn-1" @change="handleProduct(product)">Add</button>
                        </div>
                    </li>
                </ul>
                </div>
            </div>

           

            <div class="">
                <p>Status</p>
                <select
                    class="col-span-3 w-full rounded-md text-sm p-2"
                    required="required"
                    v-model="userData.status"
                >
                    <option value="" selected="selected">Select Status</option>
                    <option value="1"> Active </option>
                    <option value="0"> Inactive </option>
                </select>
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

<style src="@vueform/multiselect/themes/default.css"></style>
