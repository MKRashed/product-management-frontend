import { checkAuth } from "@/middlewares/auth";

export default [
    {
        path: 'dashboard',
        name: 'my-dashboard',
        component: () => import('@/views/DashBoard.vue'),
        meta: {
            title: 'My Dashboard'
        },
        beforeEnter: [checkAuth],
    },

    {
        path: 'products',
        children: [
            {
                path: '',
                name: 'products',
                component: () => import('@/views/ProductList.vue'),
                meta: {
                    title: 'My Products'
                },
                beforeEnter: [checkAuth],
            },
            {
                path: 'add-product',
                name: 'add-product',
                component: () => import('@/views/ProductAdd.vue'),
                meta: {
                    title: 'Product Add'
                },
                beforeEnter: [checkAuth],
            },         
            {
                path: ':id/products',
                name: 'product-edit',
                component: () => import('@/views/ProductEdit.vue'),
                meta: {
                    title: 'Product Edit'
                },
                beforeEnter: [checkAuth],
            },         
           
        ]
    },
    
    {
        path: 'customers',
        children: [

            {
                path: '',
                name: 'customers',
                component: () => import('@/views/CustomerList.vue'),
                meta: {
                    title: 'Customers'
                },
                beforeEnter: [checkAuth],
            },

            {
                path: 'add-customer',
                name: 'add-customer',
                component: () => import('@/views/CustomerAdd.vue'),
                meta: {
                    title: 'Add Customers'
                },
                beforeEnter: [checkAuth],
            },

            {
                path: ':customer_id/customer',
                name: 'edit-customer',
                component: () => import('@/views/CustomerEdit.vue'),
                meta: {
                    title: 'Edit Customers'
                },
                beforeEnter: [checkAuth],
            },
        ]
    },


    {
        path: 'orders',
        children: [
            {
                path: '',
                name: 'orders',
                component: () => import('@/views/OrderList.vue'),
                meta: {
                    title: 'Order'
                },
                beforeEnter: [checkAuth],
            },
            {
                path: 'add-order',
                name: 'add-order',
                component: () => import('@/views/OrderAdd.vue'),
                meta: {
                    title: 'Add Order'
                },
                beforeEnter: [checkAuth],
            },
            {
                path: 'edit-order',
                name: 'edit-order',
                component: () => import('@/views/OrderEdit.vue'),
                meta: {
                    title: 'Edit Order'
                },
                beforeEnter: [checkAuth],
            }

        ]
    },
]