import { defineStore } from 'pinia';
import { ref } from 'vue';


export const TeamStore = defineStore('TeamStore', () => {

    const members = ref([]);
    
    return {
        members
    }
    
});
export default TeamStore;
