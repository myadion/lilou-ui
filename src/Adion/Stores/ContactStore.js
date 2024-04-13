import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const ContactStore = defineStore('ContactStore', () => {
    
    const finder = ref(false)

    return {
        finder  
    }
    
});
export default ContactStore;
