<template>
    <div>
        <h1 class="mb-5">Journal d'appel</h1>

        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details></v-text-field>

        <v-data-table :loading="loading" :headers="headers" :items="processedCalls" :search="search" density="compact">

            <template v-slot:item="{ item }">
                <tr :class="item.rowClass">
                    <td><v-icon>{{ item.icon }}</v-icon></td>
                    <td>{{ item.caller }}</td>
                    <td>{{ item.called }}</td>
                    <td>{{ formatDuration(item.duration) }}</td>
                    <td>{{ formatDate(item.date) }}</td>
                    <td>{{ formatTime(item.time) }}</td>
                </tr>
            </template>                        
        </v-data-table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import useWazoService from '@/stores/wazo';

const wazo = useWazoService();
const search = ref("");
const headers = [
    { key: 'icon' },
    { title: 'Source', key: 'caller' },
    { title: 'Destination', key: 'called' },
    { title: 'Durée', key: 'duration' },
    { title: 'Date', key: 'date' }, 
    { title: 'Heure', key: 'time' },

];
const cdr = ref([]);
const loading = ref(true);

onMounted(async () => {
    const data = await wazo.get_call_history();
    cdr.value = data;
    loading.value = false;
});

const processedCalls = computed(() => {
    return cdr.value.map(call => {
        let icon = ''
        let rowClass = ''
    
        if (call.callDirection === 'outbound') {
            icon = "mdi-call-made"
        } else if (call.callDirection === 'inbound') {
            icon = "mdi-call-received"
        } else if (call.callDirection === 'internal') {
            icon = "mdi-swap-vertical-variant"
        }

        if(call.answered === false) {
            icon = "mdi-call-missed"
            if(call.callDirection === 'inbound'){                
                rowClass = 'missed-call';
            }
        }
        
        return {
            icon: icon,
            caller: call.source.name || "Inconnu",
            called: call.destination.name || call.destination.extension || "Inconnu",
            duration: call.duration,
            date: call.start,
            time: call.start,
            rowClass: rowClass,
        };
    });
});

const itemRowClass = (item) => {
    return item.rowClass;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString();
}

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else {
        return `${minutes}m ${seconds}s`;
    }
}

</script>

<style>
.missed-call {
    color: red;
}
</style>