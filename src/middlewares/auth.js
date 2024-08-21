import { loadApp } from "@/lib/server";

import { useAuthStore } from "@/stores/auth";

export async function checkAuth( to, form, next ){

    await loadApp( );

    const authStore = useAuthStore();

    if( !authStore.is_logged_in ) {

        const toName = to.name;
        
        const toParams = to.params;

        const q =  encodeURI( JSON.stringify({ name: toName, params: toParams }) )

        const query = toName? {next: q }:{next: 'my-dashboard'}

        await next({
            name: 'login',
            query
        });
    }

    await next( );
}
