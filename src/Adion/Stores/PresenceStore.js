import { defineStore } from 'pinia';
import { ref } from 'vue';


export const PresenceStore = defineStore('PresenceStore', () => {

    const type = [
        { text: 'Disponible', value: 'available', color: 'green'},
        { text: 'Absent', value: 'away', color: 'yellow'},
        { text: 'Ne pas déranger', value: 'dnd', color: 'red'},
        { text: 'Déconnecté', value: 'offline', color: 'gray'}
    ];
    
    return {
        type
    }
    
});
export default PresenceStore;
