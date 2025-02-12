import { defineStore } from 'pinia';
import { ref } from 'vue';

export const WebRTCStore = defineStore('WebRTCStore', () => {

    const client = ref(null)
    const phone = ref(null)
    const sessions = ref([])

    return {
        client,
        phone,
        sessions
    }
    
}, {
    persist: {
        storage: localStorage,
        paths: ['sessions'],
    }
});
export default WebRTCStore;
