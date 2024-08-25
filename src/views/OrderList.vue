<script setup>
import { useOrderStore } from '@/stores/order';
import Item from "@/views/ProductItem.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const orderStore = useOrderStore()

const { list } = storeToRefs(orderStore)

onMounted(async () => {
    await orderStore.fetchOrders();
})

</script>

<template>
    <div class="container mx-auto flex justify-center pb-4">
        <div class="w-full max-w-5xl md:mx-5 px-2">

            <h2 class="text-center font-bold text-xl p-3">Order List</h2>

            <div class="flex p-4">
                <RouterLink :to="{ name: 'add-order' }" class="group main-button btn-1">
                    <h4 class="text-base md:text-xl font-semibold"> Add Order </h4>
                </RouterLink>
            </div>

            <div class="flex flex-col gap-4">
                <div class="card-bg gap-0 overflow-x-auto">
                    <div class="min-w-[1000px] md:min-w-[auto] print:min-w-[auto]">
                        <table class="min-w-full border-collapse border border-gray-200">
                            <thead class="bg-blue-100 font-semibold sticky top-0 z-20">
                                <tr class="divide-x-2 border">
                                    <th class="p-2 text-sm text-center">Customer</th>
                                    <th class="p-2 text-sm text-center">Amount</th>
                                    <th class="p-2 text-sm text-center">Items</th>
                                    <th class="p-2 text-sm text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in list" :key="data.id" class="divide-x-2 border">
                                    <td class="p-2 text-center">
                                        {{ data.customer.first_name }} {{ data.customer.last_name }}
                                    </td>
                                    <td class="p-2 text-center overflow-auto">{{ data.total_amount }}Tk</td>
                                    <td class="p-2 text-center overflow-auto">
                                        {{ Array.isArray(data.order_items) ? data.order_items.length : 0 }}
                                    </td>
                                   
                                    <td class="p-2 text-center">
                                        <RouterLink :to="{ name: 'edit-order', params:{ order_id:data.id } }" class="group main-button btn-2">
                                            <h4 class="text-base font-semibold"> Edit </h4>
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>