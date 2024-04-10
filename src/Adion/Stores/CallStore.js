import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const CallStore = defineStore('CallStore', () => {
    
    const categories = ['incoming', 'talking', 'hold', 'transfer', 'conference']

    const active = reactive({
        'incoming' : [],
        'talking' : [],
        'hold' : [],
        'transfer' : [],
        'conference' : [],
    })
    
    const log = ref([])

    return {
        categories,
        active,
        log        
    }
    
});
export default CallStore;
