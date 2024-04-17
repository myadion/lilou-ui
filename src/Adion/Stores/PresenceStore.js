import { defineStore } from 'pinia';
import { ref } from 'vue';


export const PresenceStore = defineStore('PresenceStore', () => {

    const type = [
        { text: 'Disponible', value: 'available', color: 'green', icon: 'mdi-check-circle'},
        { text: 'Absent', value: 'away', color: 'yellow', icon: 'mdi-alert-circle'},
        { text: 'Ne pas déranger', value: 'dnd', color: 'red', icon: 'mdi-alert-octagon'},
        { text: 'Déconnecté', value: 'offline', color: 'gray', icon: 'mdi-close-circle'}
    ];
    const edit = ref(false);
    
    return {
        type,
        edit
    }
    
});
export default PresenceStore;
