import { useAppStore } from "@/stores/app";
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;

console.log({ENV: axios.defaults.baseURL})

window.csrf_loaded = false;

const server = {};

const LOGIN_TOKEN_KEY = 'FGH534HSPXUZRGJW67DFG3HD';

function csrf(){
  return new Promise((resolve) => {

    const callCsrfApi = () => {
      axios
        .get('/sanctum/csrf-cookie')
        .then(() => {
          resolve();
          window.csrf_loaded = true;
        })
        .catch(() => {
          setTimeout(callCsrfApi, 2000);
        })
    }

    return window.csrf_loaded 
        ? resolve()
        : callCsrfApi();
  });
}

window.appInitializing = false;

window.appData = null;

async function loadApp() {
    const app = useAppStore();
    const token = localStorage.getItem(LOGIN_TOKEN_KEY);
    if(token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      

  return new Promise((resolve, reject) => {

    function callAppDataApi() {

        if( window.appData ) {
          return resolve(window.appData);
        } 
        
        if(window.appInitializing) {
            return setTimeout(callAppDataApi, 300);
        } 

        window.appInitializing = true;

        csrf()
            .then(( ) => {

                console.log({headers: axios.defaults.headers})

                app.load_app()
                    .then((data) => {
                        window.appData = data;
                        resolve(window.appData);
                    })
                    .catch(reject);
            });
    }

    callAppDataApi();
  });
}


function setServerFunction(method) {
  return function(...args){
    return new Promise( (resolve, reject) => {
      csrf()
        .then((appData) => {

          axios[method]
              .apply({ }, args)
              .then( response => {
                resolve(response, appData);

              })
              .catch((error) => {
                  reject(error);
              });

        }
      );
    });
  }
}

['get', 'post', 'put', 'delete']
    .forEach( method => {
        server[method] = setServerFunction(method)
    });

function set_auth_token_on_local_storage( token ){
    if( !token ) {
        return localStorage.removeItem( LOGIN_TOKEN_KEY );
    }
    localStorage.setItem( LOGIN_TOKEN_KEY, token )
}

// export default csrf();

export { axios, loadApp, LOGIN_TOKEN_KEY, server, set_auth_token_on_local_storage };

