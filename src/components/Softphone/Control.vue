<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="4">
                <v-btn outlined rounded size="small" width="80px" class="rounded-pill mt-5 adion-btn-conf" icon="mdi-account-group" disabled/>
            </v-col>
            <v-col cols="4">
                <v-btn outlined rounded size="small" width="80px" class="rounded-pill mt-5 adion-btn-transfer" icon="mdi-step-forward" disabled/>
            </v-col>
            <v-col cols="4">
                <v-btn outlined rounded size="small" width="80px" class="rounded-pill mt-5 adion-btn-atransfer" icon="mdi-step-forward-2" disabled/>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="mute ? 'mdi-microphone-off': 'mdi-microphone'" @click="mute_call"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="hold ? 'mdi-play' : 'mdi-pause'" @click="hold_call"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" icon="mdi-phone-plus" @click="emit('create_call')"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="record ? 'mdi-record-rec' : 'mdi-record'" @click="record_call" :class="record ? 'adion-recording' : ''"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" icon="mdi-dialpad" @click="emit('show_dialpad')"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined disabled rounded height="50px" width="50px" class="rounded-pill" icon="mdi-video"/>
            </v-col>

            <v-col cols="12" class="adion-hangup">
                <v-btn outlined size="small" rounded width="80px" class="rounded-pill mt-5" icon="mdi-phone-hangup" @click="hangup"/>
            </v-col>                
        </v-row>
    </v-container>
</template>

<script setup>
    import { ref, defineEmits, watch } from 'vue';

    const props = defineProps({
        call: String,
        mute: Boolean,
        hold: Boolean,
        record: Boolean,
    });

    const emit = defineEmits([
        'create_call',
        'hold_call',
        'unhold_call',
        'show_dialpad',
        'hangup_call',
        'mute_call',
        'unmute_call',
        'start_record_call',
        'stop_record_call',
    ]);

    function hold_call(){
        if(props.hold === true){
            emit('unhold_call', props.call)
        } else{
            emit('hold_call', props.call)
        }
    }    

    function mute_call(){
        if(props.mute === true){
            emit('unmute_call', props.call)
        } else{
            emit('mute_call', props.call)
        }
    }

    function record_call(){        
        if (props.record === true) {
            emit('stop_record_call', props.call)
        } else {
            emit('start_record_call', props.call)
        }
    }

    function hangup(){
        emit('hangup_call', props.call)
    }
</script>

<style scoped>
.adion-hangup, .v-col{
    text-align: center;
}

.adion-hangup button{
    color: white;
    background-color: #B53838;
}

.adion-btn-conf{
    color: white;
    background-color: #2B4461;
}
.adion-btn-transfer{
    color: white;
    background-color: #2B4461;
}

.adion-btn-atransfer{
    color: white;
    background-color: #2B4461;
}

.adion-recording {
    color: #B53838;
}

</style>
