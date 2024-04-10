import { defineStore } from 'pinia';
import { ref } from 'vue';

export const WebsocketStore = defineStore('WebsocketStore', () => {

    const client = ref(null)
    const base = ref(null)
    const events = ref({})

    const destroy = async () => {
        if (client.value) {
            await client.value.close()
        }
        client.value = null
        base.value = null
    }

    return {
        destroy,
        client,
        base,
        events
    }
    
});
export default WebsocketStore;
