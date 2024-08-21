import axios from 'axios'
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

    const token = localStorage.getItem(LOGIN_TOKEN_KEY);

    const gns_ddt = localStorage.getItem('_gns-ddt');


    if(token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      }
      
    if( gns_ddt ) {
      axios.defaults.headers['X-GNS-DDT'] = `${encodeURI(gns_ddt)}`;
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

function setGnsDdt(response){
  if( response?.data?.gns_ddt && !localStorage.getItem( '_gns-ddt' ) ) {
    localStorage.setItem( '_gns-ddt', response.data.gns_ddt );
  }
}

function setServerFunction(method) {
  return function(...args){
    return new Promise( (resolve, reject) => {
      loadApp()
        .then((appData) => {

          axios[method]
              .apply({ }, args)
              .then( response => {

                setGnsDdt( response );
                resolve(response, appData);

              })
              .catch((error) => {
                  setGnsDdt( error?.response || {});
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

export {axios, server, loadApp, LOGIN_TOKEN_KEY, set_auth_token_on_local_storage}
