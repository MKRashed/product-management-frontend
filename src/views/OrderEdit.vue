<script setup>
import { useOrderStore } from '@/stores/order';
import Multiselect from '@vueform/multiselect';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();

const orderStore = useOrderStore()

const { customers, products, custom_products, currentOrder } = storeToRefs(orderStore)

const userData = reactive({
    customer_id: '',
    status:0,
    total_amount:'',
    selectedItem:[],
})


onMounted( async () => {
     await orderStore.createOrders();
     await orderStore.editOrder(route.params.order_id);
})

const selectedProduct = (productId) => {
  
  return products.value.find(product => product.id === productId);
  
};

const updateSubtotal = (selected) => {
  const product = selectedProduct(selected.product_id);
  if (product) {
    selected.subtotal = selected.quantity * product.price;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
  }).format(value);
};

watch(currentOrder, (data) => {
    userData.customer_id = data.order.customer_id;
    userData.status = data.order.status;
    userData.total_amount = data.order.total_amount;
    userData.selectedItem = data.order.order_items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        subtotal: item.price,
    }));
});


async function handleSelectedProducts(selectedItem) {

    const arrayIndex = selectedItem.length - 1;

    const selectedProductId = parseInt(selectedItem[arrayIndex]);

    const existingProductIndex = userData.selectedItem.findIndex((product) => {
        return parseInt(product.item) === selectedProductId;
    });
    

    if (existingProductIndex !== -1) {
        userData.selectedItem.splice(existingProductIndex, 1);
    } else {

        if (selectedItem.length > 0) {
            userData.selectedItem.push({
                product_id: selectedProductId,
                quantity: 1,
                subtotal:selectedProduct(selectedProductId).price,
            });
        }
    }
}

// Function to unselect product
const unselectProduct = (productId) => {
  userData.selectedItem = userData.selectedItem.filter(
    selected => selected.product_id !== productId
  );
};


const totalSubtotal = computed(() => {

  return userData.total_amount = userData.selectedItem.reduce((total, selected) => {

    const subtotal = Number(selected.subtotal) || 0;
    
    return total + subtotal;

  }, 0);
});



async function handleFormSubmit() {
  try {
    await orderStore.updateOrder(userData, route.params.order_id)
    return router.push({name: 'orders'});
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

            <div class="">
                <p>Orders</p>
                <Multiselect
                    :options="custom_products"
                    label="label"
                    track-by="id"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    @change="handleSelectedProducts($event)"
                    />
            </div>

            <div>
                <div v-if="userData.selectedItem.length">
                <h3>Selected Product Details:</h3>
                <ul class="flex flex-wrap gap-4">
                    <li v-for="selected in userData.selectedItem" :key="selected.product_id.id" class="border p-2 rounded">
                        <p><strong>ID:</strong> {{ selectedProduct(selected.product_id).id }}</p>
                        <p><strong>Name:</strong> {{ selectedProduct(selected.product_id).name }}</p>
                        <p><strong>Price:</strong> {{ formatCurrency(selectedProduct(selected.product_id).price) }}</p>
                        <div>
                            <input type="number" v-model.number="selected.quantity" min="1" @change="updateSubtotal(selected)">
                            <p><strong>Subtotal:</strong> {{ formatCurrency(selected.subtotal || selectedProduct(selected.product_id).price) }}</p>
                            <button type="button" class="btn-2" @click="unselectProduct(selected.product_id)">Remove</button>
                        </div>
                    </li>
                </ul>

                <h4 class="text-xl font-bold">Total: {{ formatCurrency(totalSubtotal) }}</h4>
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
