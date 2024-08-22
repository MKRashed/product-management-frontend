import { LOGIN_TOKEN_KEY, server } from "@/lib/server";
import { defineStore } from "pinia";
import { ref } from "vue";

export const TOKEN_EXPIRE_TIME_KEY = "_oQiRWxpRZTdCsaMSzeD";

export const TOKEN_EXPIRE_INTO_KEY = "_aQxCsElaHnJezUiWz";

export const useAuthStore = defineStore("authStore",() => {

    const logging_in = ref( false );
    const logging_out = ref( false );
    const is_logged_in = ref( false );
    const user = ref({});

    function set_auth_token_on_local_storage( token ){
        if( !token ) {
            return localStorage.removeItem( LOGIN_TOKEN_KEY );
        }
        localStorage.setItem( LOGIN_TOKEN_KEY, token )
    }

    let tokenTimeoutId = setInterval(check_local_token,1000);

    function check_local_token(){
        if( !localStorage.getItem( LOGIN_TOKEN_KEY ) ) {
            is_logged_in.value = false;
            clearTimeout( tokenTimeoutId );
        }
    }

    function set_user( user ){
        user.value = user;
    }

    function set_is_logged_in( value ){
        is_logged_in.value = value;
    }

    function set_logged_in( token, user ){
        if( token && user ) {
            set_auth_token_on_local_storage( token );
            set_user( user );
            set_is_logged_in(true );
            tokenTimeoutId = setInterval(check_local_token,1000)
        }
    }

    function set_logged_out( ){
        set_auth_token_on_local_storage( null );
        set_user( null );
        set_is_logged_in(false );

        console.log({is_logged_in: is_logged_in.value, user: user.value})
    }

    async function login( data ){

        logging_in.value = true;

        try {
            const loginData = (await server.post(`api/login`, data)).data
            set_logged_in( loginData.token, loginData.user );
        } catch (err){
            console.error({err})
            throw err;
        } finally {
            logging_in.value = false;
        }
    }

    async function logout(){
        logging_out.value = true;
        try {
            await server.post( `api/logout` )
        } finally {
            logging_out.value = false;
            set_logged_out();
        }
    }

    async function register(data, token = null){

        logging_out.value = true;

        try {           
            await server.post('api/register', data, {headers:{ 'X-OTP-TOKEN' :token }} )
        } 

        finally {
            logging_out.value = false;
        }
    }

    return {
        register,
        login,
        logging_in,
        set_user,
        set_is_logged_in,
        logout,
        is_logged_in,
        set_auth_token_on_local_storage,
        user
    }

})