<template>
    <v-container class="softphone">
        <search/>
        <status/>
        <div class="top">

            <incoming v-for="call in adion.call.active.incoming" 
                :key="call.number" 
                :call="call.id" 
                :number="call.number" 
                :name="call.name" 
                :start="call.start" 
                @hangup="adion.call.reject(call.id)" 
                @answer="adion.call.answer(call.id)"
            />

            <hold v-for="call in adion.call.active.hold" 
                :key="call.number" 
                :call="call.id" 
                :number="call.number" 
                :name="call.name" 
                :start="call.start" 
                @unhold="adion.call.unhold(call.id)" 
            />

            <Clock v-if="
                adion.call.active.incoming.length === 0 && 
                adion.call.active.talking.length === 0 ||
                adion.call.active.hold.length === 0
            " />
        </div>
        <div class="bottom pb-5">

            <user v-if="adion.call.active.talking.length === 0" 
            />

            <avatar v-if="adion.call.active.talking.length > 0"
                :call="adion.call.active.talking[0]"
            />

            <dialpad v-if="adion.call.active.talking.length > 0 && !hide_dialpad" 
                :input="false" 
                :back="true" 
                :call="adion.call.active.talking[0]"
                @close="handle_close_dialpad"
            />

            <dialpad v-if="adion.call.active.talking.length == 0" 
                :input="true" 
            />

            <control v-if="adion.call.active.talking.length > 0 && !hide_control" 
                :call="adion.call.active.talking[0]"              
                @show_dialpad="handle_show_dialpad" 
                @create_call="handle_search_show" 
            />

        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import useAdion from '@/Adion'

const adion = useAdion()
const search_showed = ref(false)

let hide_control = ref(false)
let hide_dialpad = ref(true)

function handle_key_down(event) {
    if (event.altKey && event.key === 'q') {
        handle_search_show()
    }
}

function handle_search_show() {
    search_showed.value = !search_showed.value
}


function handle_show_dialpad() {
    hide_control.value = true
    hide_dialpad.value = false
}

function handle_close_dialpad() {
    hide_dialpad.value = true

    if (adion.call.active.talking.length > 0){
        hide_control.value = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', handle_key_down);
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handle_key_down);
})

watchEffect(() => {
    if (adion.call.active.talking === null) {
        hide_control.value = true
        hide_dialpad.value = false
    }
})


</script>

<style scoped>
.softphone {
    background-image: url('/softphone_background.svg');
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
