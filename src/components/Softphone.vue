<template>
    <v-container class="softphone">
        <search :show="search_showed" @close="search_showed = !search_showed"/>
        <div class="top">

            <incoming v-for="call in webRTC.incoming_call" 
                :key="call.number" 
                :call="call.id" 
                :number="call.number" 
                :name="call.name" 
                :start="call.start" 
                @hangup="handle_reject" 
                @answer="handle_answer"
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
                webRTC.incoming_call.length === 0 &&
                webRTC.current_hold_call.length === 0 &&
                webRTC.active_call.length === 0
            " />
        </div>
        <div class="bottom pb-5">

            <user v-if="webRTC.incoming_call.length === 0 &&
                webRTC.current_hold_call.length === 0 &&
                webRTC.active_call.length === 0" 
            />

            <avatar v-if="computed_active_call" 
                :number="computed_active_call.number" 
                :name="computed_active_call.name" 
                :start="computed_active_call.start"
            />

            <dialpad v-if="computed_active_call && !hide_dialpad" 
                :input="false" 
                :back="true" 
                :call="computed_active_call.id"
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
                :hold="(webRTC.current_hold_call.length === 1) ? true : false" 
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
import { useWebRTC } from '@/stores/webrtc';

const webRTC = useWebRTC()
webRTC.init()

const search_showed = ref(false)

let hide_control = ref(false)
let hide_dialpad = ref(true)

function handle_key_down(event) {
    if (event.altKey && event.key === 'q') {
        handle_search_show()
    }
}

// Retourne les appelles en attente
const computed_hold_call = computed(() => {
    return webRTC.active_call.filter(call => call.status === 'wait')
})

// Retourne l'appel actif ou l'un des appels en attente
const computed_active_call = computed(() => {
    const active = webRTC.active_call.filter(call => call.status === 'active')[0]
    if (active) {
        return active
    }

    if(webRTC.current_hold_call.length > 0){
        return webRTC.current_hold_call[0]
    }

    if(computed_hold_call.length > 0){
        return computed_hold_call[0]
    }

    return null
})

function handle_search_show() {
    search_showed.value = !search_showed.value
}

function handle_reject(call) {
    webRTC.reject(call)
}

function handle_answer(call) {
    webRTC.answer(call)
    hide_dialpad.value = true
    hide_control.value = false
}

function handle_hangup(call) {
    console.log('hangup', call)
    webRTC.hangup(call)
}

function handle_hold(call) {
    webRTC.hold(call)
}

function handle_unhold(call) {
    webRTC.unhold(call)
    hide_dialpad.value = true
    hide_control.value = false
}


function handle_make_call(number) {
    console.log('make call', number)
    hide_dialpad.value = true
    hide_control.value = false
    webRTC.make_call(number)
}

function handle_mute(call) {
    webRTC.mute(call)
}

function handle_unmute(call) {
    webRTC.unmute(call)
}

function handle_start_record_call(call) {
    console.log('start record call', call)
    webRTC.active_call.forEach(c => {
        if (c.id === call) {
            c.recorded = true
        }
    })
}

function handle_stop_record_call(call) {
    console.log('stop record call', call)
    webRTC.active_call.forEach(c => {
        if (c.id === call) {
            c.recorded = false
        }
    })
}


function handle_show_dialpad() {
    hide_control.value = true
    hide_dialpad.value = false
}

function handle_close_dialpad() {
    hide_dialpad.value = true

    if(webRTC.active_call.length > 0){
        hide_control.value = false
    }
}

function handle_dtmf(value) {
    webRTC.dtmf(value.call, value.dtmf)
}


onMounted(() => {
    window.addEventListener('keydown', handle_key_down);
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handle_key_down);
})

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
