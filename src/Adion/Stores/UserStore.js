import { defineStore } from 'pinia';
import { ref } from 'vue';

export const UserStore = defineStore('UserStore', () => {

    const acls = ref([])
    const key = ref('')
    const secret = ref('')

    const connected = ref(null)

    const me = ref({})
    const navigatorPermissionsGranted = ref(null)

    const sip = ref({        
        username : 'yzp6784a',
        password : '159753852',
        host : 'uc.adion-voip.eu',
        port : '443',
    })

    const callLog = ref([])
    

    return {
        acls,
        key,
        secret,
        connected,
        me,
        navigatorPermissionsGranted,
        sip,
        callLog
    }
    
}, { persist: true });
export default UserStore;
