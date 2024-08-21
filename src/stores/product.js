import { server } from "@/lib/server";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("productStore", () => {
  
    const list = ref([]);
    const currentProduct = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function fetchProducts() {
        loading.value = true;
        try {
            const { data } = await server.get('/api/products');
            list.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch products";
        } finally {
            loading.value = false;
        }
    }

    async function addProduct(productData) {
        loading.value = true;
        try {
            const { data } = await server.post('/api/products', productData);
            list.value.push(data);
        } catch (err) {
            error.value = err.response?.data || "Failed to add product";
        } finally {
            loading.value = false;
        }
    }

    async function editProduct(productId) {
        loading.value = true;
        try {
            const { data } = await server.get(`/api/products/edit/${productId}`);
            currentProduct.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch product details";
        } finally {
            loading.value = false;
        }
    }

    async function updateProduct(productData, productId) {
        loading.value = true;
        try {
            const { data } = await server.put(`/api/products/${productId}`, productData);
            const index = list.value.findIndex(product => product.id === productId);
            if (index !== -1) {
                list.value[index] = data;
            }
            currentProduct.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to update product";
        } finally {
            loading.value = false;
        }
    }

    return {
        list,
        currentProduct,
        loading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        updateProduct,
    };
});
