<template>
    <v-container class="softphone">
        <search :show="search_showed" @close="search_showed = !search_showed"/>
        <div class="top">

            <incoming v-for="call in incoming_call" 
                :key="call.number" 
                :call="call.id" 
                :number="call.number" 
                :name="call.name" 
                :start="call.start" 
                @hangup="handle_incoming_hangup" 
                @answer="handle_incoming_answer"
            />

            <hold v-for="call in computed_hold_call" 
                :key="call.number" 
                :call="call.id" 
                :number="call.number" 
                :name="call.name" 
                :start="call.start" 
                @unhold="handle_unhold" 
            />

            <Clock v-if="
                incoming_call.length === 0 &&
                current_hold_call.length === 0 &&
                active_call.length === 0
            " />
        </div>
        <div class="bottom pb-5">

            <user v-if="incoming_call.length === 0 &&
                current_hold_call.length === 0 &&
                active_call.length === 0" 
            />

            <avatar v-if="computed_active_call" 
                :number="computed_active_call.number" 
                :name="computed_active_call.name" 
                :start="computed_active_call.start"
            />

            <dialpad v-if="computed_active_call && !hide_dialpad" 
                :input="false" 
                :back="true" 
                @dtmf="handle_dtmf" 
                @close="handle_close_dialpad"
            />

            <dialpad v-if="!computed_active_call && !hide_dialpad" 
                :input="true" 
                @close="handle_close_dialpad" 
                @make_call="handle_make_call"
            />

            <control v-if="computed_active_call && !hide_control" 
                :call="computed_active_call.id" 
                :mute="computed_active_call.muted" 
                :hold="(current_hold_call.length === 1) ? true : false" 
                :record="computed_active_call.recorded"                
                @show_dialpad="handle_show_dialpad" 
                @create_call="handle_search_show" 
                @hangup_call="handle_hangup" 
                @hold_call="handle_hold" 
                @unhold_call="handle_unhold" 
                @mute_call="handle_mute"
                @unmute_call="handle_unmute"
                @start_record_call="handle_start_record_call"
                @stop_record_call="handle_stop_record_call"
            />

        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, computed, watchEffect } from 'vue';
const search_showed = ref(false)
// const incoming_call = reactive([])

const incoming_call = reactive([
    {
        id: '287d94cd-4f2a-44db-a2cc-40a02a036f80',
        number: '113',
        name: 'Jordan Carpanin',
        start: new Date(),
    },
    {
        id: '9b85e677-a715-40f7-a9fd-22ad5577cf97',
        number: '+336154874129',
        name: 'Manon Cossoul',
        start: new Date(),
    }
])

const active_call = reactive([])

// const active_call = reactive([
//     {
//         id: '3d5a6199-bfc5-43ae-9632-25b2bb2fc353',
//         number: '+33784551184',
//         name: 'Lucie Leplat',
//         start: new Date(),       
//         muted: false,
//         status: 'active', 
//     },
//     {
//         id: '287d94cd-4f2a-44db-a2cc-40a02a036f80',
//         number: '113',
//         name: 'Jordan Carpanin',
//         start: new Date(),
//         muted: false,
//         status: 'wait',
//     }
// ])

const current_hold_call = reactive([])
let hide_control = ref(false)
let hide_dialpad = ref(true)

function handle_key_down(event) {
    if (event.altKey && event.key === 'q') {
        handle_search_show()
    }
}

// Retourne les appelles en attente
const computed_hold_call = computed(() => {
    return active_call.filter(call => call.status === 'wait')
})

// Retourne l'appel actif ou l'un des appels en attente
const computed_active_call = computed(() => {
    const active = active_call.filter(call => call.status === 'active')[0]
    if (active) {
        return active
    }

    if(current_hold_call.length > 0){
        return current_hold_call[0]
    }

    if(computed_hold_call.length > 0){
        return computed_hold_call[0]
    }

    return null
})

function handle_search_show() {
    console.log('search show')
    search_showed.value = !search_showed.value
}

function handle_incoming_hangup(call) {
    console.log('incoming hangup', call)
    incoming_call.splice(incoming_call.findIndex(c => c.id === call), 1)
}

function handle_incoming_answer(call) {
    console.log('incoming answer', call)
    hide_dialpad.value = true
    hide_control.value = false
    
    place_all_call_on_hold()
    current_hold_call.splice(0, current_hold_call.length)

    // On ajoute l'appel en cours a active_call et on lui met le status active
    active_call.push(incoming_call.find(c => c.id === call))
    active_call.forEach(c => {
        if (c.id === call) {
            c.status = 'active'
        }
    })

    // on supprime l'appel de incoming_call
    incoming_call.splice(incoming_call.findIndex(c => c.id === call), 1)
}

function handle_unhold(call) {
    console.log('unhold', call)
    hide_dialpad.value = true
    hide_control.value = false
    current_hold_call.splice(0, current_hold_call.length)
    active_call.forEach(c => {
        if (c.id === call) {
            c.status = 'active'
        }else{
            c.status = 'wait'
        }
    })
}

function handle_hold(call) {
    console.log('hold', call)
    active_call.forEach(c => {
        if (c.id === call) {
            c.status = 'wait'
            current_hold_call.splice(0, current_hold_call.length)
            current_hold_call.push(c)
        }
    })
}

function handle_make_call(number) {
    console.log('make call', number)
    // hide_dialpad.value = true
    // hide_control.value = false
    // On essaye de trouver les informations dans le carnet d'adresse
    // On ajoute l'appelle a incoming_call
}

function handle_mute(call) {
    console.log('mute', call)
    active_call.forEach(c => {
        if (c.id === call) {
            c.muted = true
        }
    })
}

function handle_unmute(call) {
    console.log('unmute', call)
    active_call.forEach(c => {
        if (c.id === call) {
            c.muted = false
        }
    })
}

function handle_start_record_call(call) {
    console.log('start record call', call)
    active_call.forEach(c => {
        if (c.id === call) {
            c.recorded = true
        }
    })
}

function handle_stop_record_call(call) {
    console.log('stop record call', call)
    active_call.forEach(c => {
        if (c.id === call) {
            c.recorded = false
        }
    })
}

function handle_hangup(call) {
    console.log('hangup', call)
    active_call.splice(active_call.findIndex(c => c.id === call), 1)
    if(current_hold_call.length > 0 && current_hold_call[0].id === call){
        current_hold_call.splice(0, current_hold_call.length)
    }
}

function handle_show_dialpad() {
    console.log('show dialpad')
    hide_control.value = true
    hide_dialpad.value = false
}

function handle_close_dialpad() {
    console.log('close dialpad')
    hide_dialpad.value = true

    if(active_call.length > 0){
        hide_control.value = false
    }
}

function handle_dtmf(value) {
    console.log('dtmf', value)
}

function place_all_call_on_hold() {
    active_call.forEach(call => {
        call.status = 'wait'
    })
}


onMounted(() => {
    window.addEventListener('keydown', handle_key_down);
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handle_key_down);
})

// Dès qu'il n'ya plus d'appel actif on affiche le clavier
watchEffect(() => {
    if (computed_active_call.value === null) {
        hide_control.value = true
        hide_dialpad.value = false
    }
})
</script>

<style scoped>
.softphone {
    background-image: url('softphone_background.svg');
    background-size: cover;
    height: 100vh;
    color: white;
    overflow: hidden;
    padding: 0;
}

.top {
    height: 30vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    overflow-y: auto;
    align-items: center;
    padding: 5px 10px;
}

.top::-webkit-scrollbar {
    width: 0;
}

.bottom {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 5px 10px;
}
</style>
