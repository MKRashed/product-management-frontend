<script setup>
import { useProductStore } from '@/stores/product';
import Item from "@/views/ProductItem.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const productStore = useProductStore()

const { list } = storeToRefs(productStore)

onMounted(async () => {
    await productStore.fetchProducts();
})

</script>

<template>
    <div class="container mx-auto flex justify-center pb-4">
        <div class="w-full max-w-5xl md:mx-5 px-2">

            <h2 class="text-center font-bold text-xl p-3">Product List</h2>

            <div class="flex p-4">
                <RouterLink :to="{ name: 'add-product' }" class="group main-button btn-1">
                    <h4 class="text-base md:text-xl font-semibold"> Add Product </h4>
                </RouterLink>
            </div>

            <div class="flex flex-col gap-4">
                <div class="card-bg gap-0 overflow-x-auto">
                  <div class="min-w-[1000px] md:min-w-[auto] print:min-w-[auto]">
                  <div
                      class="grid grid-cols-6 border bg-blue-100 divide-x-2 font-semibold sticky top-0 z-20"
                  >
                      <div class="p-2 flex items-center justify-center text-sm">Name</div>
                      <div class="col-span-3 p-2 flex items-center justify-center text-sm">Description</div>
                      <div class="p-2 flex items-center justify-center text-sm">Price</div>
                      <div class="p-2 flex items-center justify-center text-sm">Action</div>
                  </div>
                  <template v-for = "data in list" :key="data.id">
                      <Item  :data="data" />
                  </template>
                  </div>
               </div>
            </div>
        </div>
    </div>
</template>