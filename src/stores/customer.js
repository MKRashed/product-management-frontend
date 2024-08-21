import { server } from "@/lib/server";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomerStore = defineStore("customerStore", () => {
  
    const list = ref([]);
    const currentCustomer = ref(null);
    const loading = ref(false);
    const error = ref(null);

    async function fetchCustomers() {
        loading.value = true;
        try {
            const { data } = await server.get('/api/customers');
            list.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch customers";
        } finally {
            loading.value = false;
        }
    }

    async function addCustomer(customerData) {
        loading.value = true;
        try {
            const { data } = await server.post('/api/customers', customerData);
            list.value.push(data);
        } catch (err) {
            error.value = err.response?.data || "Failed to add customer";
        } finally {
            loading.value = false;
        }
    }

    async function editCustomer(customerId) {
        loading.value = true;
        try {
            const { data } = await server.get(`/api/customers/edit/${customerId}`);
            currentCustomer.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to fetch customer details";
        } finally {
            loading.value = false;
        }
    }

    async function updateCustomer(customerId, customerData) {
        loading.value = true;
        try {
            const { data } = await server.put(`/api/customers/${customerId}`, customerData);
            const index = list.value.findIndex(customer => customer.id === customerId);
            if (index !== -1) {
                list.value[index] = data;
            }
            currentCustomer.value = data;
        } catch (err) {
            error.value = err.response?.data || "Failed to update customer";
        } finally {
            loading.value = false;
        }
    }

    return {
        list,
        currentCustomer,
        loading,
        error,
        fetchCustomers,
        addCustomer,
        editCustomer,
        updateCustomer,
    };
});
