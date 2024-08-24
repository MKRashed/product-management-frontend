import { server } from "@/lib/server";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("orderStore", () => {
  
    const list = ref([]);

    const customers = ref([]);
    const products = ref([]);
    const custom_products = ref([]);

    const currentOrder = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function fetchOrders() {
        loading.value = true;
        try {
            const { data } = await server.get('/api/orders');
            list.value = data.orders;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch orders";
        } finally {
            loading.value = false;
        }
    }

    async function createOrders() {
        loading.value = true;
        try {
            const { data } = await server.get('/api/orders/create');
            customers.value = data.customers;
            products.value = data.products;
            custom_products.value = data.products.map(product => ({
                value: product.id,
                label: product.name
              }));
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch orders";
        } finally {
            loading.value = false;
        }
    }

    async function addOrder(orderData) {
        loading.value = true;
        try {
            const { data } = await server.post('/api/orders', orderData);
            list.value.push(data);
        } catch (err) {
            error.value = err.response?.data || "Failed to add order";
        } finally {
            loading.value = false;
        }
    }

    async function editOrder(orderId) {
        loading.value = true;
        try {
            const { data } = await server.get(`/api/orders/${orderId}/edit`);
            currentOrder.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch order details";
        } finally {
            loading.value = false;
        }
    }

    async function updateOrder(orderData, orderId) {
        loading.value = true;
        try {
            const { data } = await server.put(`/api/orders/${orderId}`, orderData);
            const index = list.value.findIndex(order => order.id === orderId);
            if (index !== -1) {
                list.value[index] = data;
            }
            currentOrder.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to update order";
        } finally {
            loading.value = false;
        }
    }

    return {
        list,
        currentOrder,
        loading,
        error,
        fetchOrders,
        addOrder,
        editOrder,
        updateOrder,
        createOrders,
        customers,
        products,
        custom_products
    };
});
