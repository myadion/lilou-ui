import axios from 'axios'
import { ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import useTeamStore from '@/stores/team';
import useHistoryStore from '@/stores/history';

export const useWebSocket = reactive({
  events: {},

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  },

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  },
});

export const useAdionService = defineStore('adion', () => {
    
    // Router
    const router = useRouter()

    // Notify
    const notify = useNotifyService()

    // Websocket
    const ws = ref(null);

    // Services
    const team = useTeamStore()
    const history = useHistoryStore()
    
    // Personnal data of the user
    const user = reactive({
        is_connected: false,
        acls: []
    })
                
    // Adion Server
    const base_api = "https://uc.adion-api.eu"
    const base_ws = "ws://ws.adion-voip.eu:32776"

    // Variables for headers
    const ck = ref('')
    const sk = ref('')
    const ak = "12a2c1f2-963f-47a2-a0ab-02a92abec5bf"

    // Axios
    const api = axios.create({
      baseURL: `${base_api}/api`,
      headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-Api-Ak' : ak}
    })

    // Axios Interceptors
    api.interceptors.request.use(
        config => {
            if(localStorage.getItem('ck') && localStorage.getItem('sk')) {
                ck.value = localStorage.getItem('ck')
                sk.value = localStorage.getItem('sk')
            }
            
            if (ck.value != '' && sk.value != '') {
                config.headers['X-Api-Ck'] = ck.value
                config.headers['X-Api-sk'] = sk.value
                localStorage.setItem('ck', ck.value)
                localStorage.setItem('sk', sk.value)
            }else{
                user.is_connected = false
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

    function reset() {
        localStorage.removeItem('ck')
        localStorage.removeItem('sk')
        ck.value = ''
        sk.value = ''
        user.is_connected = false
        ws.value = null
        return true
    }

    async function init(){
        if(localStorage.getItem('ck') && localStorage.getItem('sk')) {
            ck.value = localStorage.getItem('ck')
            sk.value = localStorage.getItem('sk')

            await get('/auth/login')
                .then(async (res) => {
                    if(res){                      
                        await initService()  
                        initWebSocket()
                        user.is_connected = true
                    } else {
                        user.is_connected = false
                        reset()
                    }
                })
                .catch(() => {
                    user.is_connected = false
                    reset()
                })
        }
    }

    function initWebSocket() {
        ws.value = new WebSocket(`${base_ws}/?ck=${ck.value}&sk=${sk.value}`);
        
        ws.value.onopen = () => {
            notify.set_success("Connexion réussie")
        };

        ws.value.onmessage = (event) => {
            const data = JSON.parse(event.data);
            useWebSocket.emit('websocket-message', {
                event: data.event,
                data: data.data
            });
        };

        ws.value.onclose = (event) => {
            console.log('WebSocket connection closed');
            notify.set_error(408, "Connexion perdue. Reconnexion en cours...")
            setTimeout(initWebSocket, 5000); 
        };
        
        ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    async function initService() {        
        team.init()
        history.init()
    }

    async function get(url, successMessage) {
        try {
            const res = await api.get(url)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }
    
    async function post(url, data, successMessage) {
        try {
            const res = await api.post(url, data)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    async function put(url, data, successMessage) {
        try {
            const res = await api.put(url, data)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    async function del(url, successMessage) {
        try {
            const res = await api.delete(url)
            if(successMessage) notify.set_success(successMessage)
            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email: email, password: password, realm : 'uc.adion-voip.eu' })

            res.data.key ? ck.value = res.data.key : ck.value = ''
            res.data.secret ? sk.value = res.data.secret : sk.value = ''  
            
            localStorage.setItem('ck', ck.value)
            localStorage.setItem('sk', sk.value)    
            user.acls = res.data.acls  
            user.is_connected = true
            await initService()  
            initWebSocket()


            Object.assign(user, await _get('/me'))

            return res.data
        } catch (error) {
            handle_error(error)
        }
    }

    const login_state = async () => get('/auth/login')

    const logout = async () => del('/auth/login', "Vous avez été déconnecté")

    const auth_refresh = async (expiration) => post('/auth/renew', {expiration: expiration ?? 3600}, "Votre session a été renouvelée")

    return { 
        post,
        get,
        put,
        del,
        user,
        reset,
        init,
        ws,
        login,
        login_state,
        logout,
        auth_refresh
    }
},
  {
    persist: true,
  },
)
export default useAdionService;