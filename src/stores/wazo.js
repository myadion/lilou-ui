import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Wazo from '@wazo/sdk/lib/simple'
import { WazoApiClient } from '@wazo/sdk/dist/wazo-sdk'


export const useWazoService = defineStore('wazo', () => {

    // Router
    const router = useRouter()

    // Session
    const session = ref([])

    // Client
    const client = new WazoApiClient({
      server: 'uc.adion-voip.eu', 
      agent: null,
      clientId: null,
      isMobile: false,
    })

    async function init(){
        Wazo.Auth.init(null, 43200, null, null);
        Wazo.Auth.setHost("uc.adion-voip.eu");
        if(session.value.token){
          client.setToken(session.value.token);
        }
    }
    
    async function login(username, password) {
      await Wazo.Auth.logIn(username, password).then(res => {
        // client.setToken(res.token);
        session.value = res
        router.push('/')
      }).catch(err => {        
        const msg = JSON.parse(err.message)
        throw new Error(msg.reason);
      })
    }

    async function logout() {
      await Wazo.Auth.logout()
      session.value = []
      router.push('/')
    }

    function me(){
      return session.value.profile
    }


    async function get_call_history(){
      return await client.callLogd.listCallLogs(0, 0).then(res => {
        return res
      })
    }



    return { 
        init,
        login,
        logout,
        me,
        get_call_history,
        session
    }
},
  {
    persist: true,
  },
)
export default useWazoService;
