import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import Wazo from '@wazo/sdk/lib/simple'
import { WazoApiClient, ApiRequester, WebSocketClient } from '@wazo/sdk/dist/wazo-sdk'

export const useWazoService = defineStore('wazo', () => {

    // Router
    const router = useRouter()

    // Notify
    const notify = useNotifyService()

    // Websocket
    const ws = ref(null);

    // Session
    const session = ref([])

    // Wazo Server
    const host = "uc.adion-voip.eu"

    // Token Api
    const token = ref(null)

    // User data
    const user = ref([])

    // Wazo Api Version:
    const auth = "0.1"
    const calld = "1.0"
    const confd = "1.1"
    const dird = "0.1"
    const provd = "0.2"
    const webhookd = "1.0"
    const calllogd = "1.0"
    const plugind = "0.2"
    const agentd = "1.0"
    const chatd = "1.0"
    const setupd = "1.0"
    
    // API calls GET, POST, PUT, DELETE
    const post = {}
    const get = {}
    const put = {}
    const del = {}

    // Axios
    const api = axios.create({
      baseURL: 'https://' + host + '/api',
      headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Accept-Language': 'fr'}
    })

    // Axios Interceptors
    api.interceptors.request.use(
        config => {
            if (token.value != null ) {
                config.headers['X-Auth-Token'] = token.value
            }

            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    // Helpers
    function handle_error(error) {
        notify.set_error(error.response.status ?? 500, error.response.data.message)
        throw new Error(error.response.data.message)
    }

    function init(){
        Wazo.Auth.init(null, 43200, null, null)
        Wazo.Auth.setHost(host)
        initWebSocket()
    }
    
    function initWebSocket() {
      ws.value = new WebSocket(`wss://${host}/api/websocketd/?token=${token.value}`);
      
      ws.value.onopen = () => {
        console.log('WebSocket connection opened');
        ws.value.send(JSON.stringify({op: "subscribe", data: {event_name: "*"}}));
        ws.value.send(JSON.stringify({op: "start"}));
      };
    
      ws.value.onmessage = (event) => {
        // const data = JSON.parse(event.data);
        // console.log(event)
        // Traitez les données reçues via WebSocket ici

        // 
      };

      ws.value.onclose = (event) => {
        console.log('WebSocket connection closed');
        if (!event.wasClean) {
          console.log('Connection lost. Reconnecting...');
          setTimeout(initWebSocket, 5000); 
        }
      };
      
      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    function reset(){
      session.value = []
      token.value = null
      user.value = []
      return true
    }
    
    async function login(username, password) {
      await Wazo.Auth.logIn(username, password).then(res => {
          user.value = res
          token.value = res.token
          // client.setToken(session.value.token);
          // requester.setToken(session.value.token);
          router.push('/')
      }).catch(err => {        
        const msg = JSON.parse(err.message)
        throw new Error(msg.reason);
      })
    }

    async function logout() {
      await Wazo.Auth.logout()
      // await client.auth.logOut(session.value.token);
      await reset()
      router.push('/')
    }

    function endpoint(url) {
      if (!url.startsWith('/')) {
          throw new Error('URL should start with a /');
      }

      const segments = url.split('/');
      const base = segments[1];

      let version;
      switch (base) {
          case 'auth':
              version = auth;
            break;
          case 'calld':
              version = calld;
            break;
          case 'confd':
              version = confd;
            break;
          case 'dird':
              version = dird;
            break;
          case 'provd':
              version = provd;
            break;
          case 'webhookd':
              version = webhookd;
            break;
          case 'call-logd':
              version = calllogd;
            break;
          case 'plugind':
              version = plugind;
            break;
          case 'agentd':
              version = agentd;
            break;
          case 'chatd':
              version = chatd;
            break;
          case 'setupd':
              version = setupd;
            break;

          default:
              throw new Error(`No version found for base: ${base}`);
      }

      segments.splice(2, 0, version);
      return segments.join('/');
    }

    async function _get(url, successMessage) {
        try {
            const res = await api.get(endpoint(url))
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }
    
    async function _post(url, data, successMessage) {
        try {
            const res = await api.post(endpoint(url), data)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    async function _put(url, data, successMessage) {
        try {
            const res = await api.put(endpoint(url), data)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    async function _del(url, successMessage) {
        try {
            const res = await api.delete(endpoint(url))
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    /** auth */
    get.auth_users = async () => _get('/auth/users')

    /** chatd */
    get.chatd_users_presences = async () => _get('/chatd/users/presences')

    /** call-logd */
    get.calllogd_users_me_cdr = async () => _get('/call-logd/users/me/cdr')

    /** dird */
    get.dird_directories_lookup_default = async (query) => _get(`/dird/directories/lookup/default?query=${query}`)
    put.dird_directories_favorites_auto_wazo_adion_source_entry_id = async (entry_id) => _put(`/dird/directories/favorites/auto/wazo-adion-source/${entry_id}`)
    del.dird_directories_favorites_auto_wazo_adion_source_entry_id = async (entry_id) => _del(`/dird/directories/favorites/auto/wazo-adion-source/${entry_id}`)

    /** confd */
    get.confd_users = async () => _get('/confd/users')
    get.confd_users_directory = async () => _get('/confd/users?view=directory')



    return { 
        init,
        reset,
        login,
        logout,
        post,
        get,
        put,
        del,
        user,
        token,
        ws
    }
},
  {
    persist: true,
  },
)
export default useWazoService;
