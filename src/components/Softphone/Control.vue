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
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="call.muted ? 'mdi-microphone-off': 'mdi-microphone'" @click="mute"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="call.hold ? 'mdi-play' : 'mdi-pause'" @click="hold"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" icon="mdi-phone-plus" @click="emit('create_call')"/>
            </v-col>
            <v-col  cols="4">
                <v-btn outlined rounded height="50px" width="50px" class="rounded-pill" :icon="call.record ? 'mdi-record-rec' : 'mdi-record'" @click="record" :class="call.record ? 'adion-recording' : ''"/>
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
    import { defineEmits } from 'vue';
    import useAdion from '@/Adion'

    const adion = useAdion()

    const props = defineProps({
        call: Object,
    });

    const emit = defineEmits([
        'create_call',
        'show_dialpad',
    ]);

    function hold(){
        if(props.call.hold === true){
            adion.call.unhold(props.call.id)
        } else{
            adion.call.hold(props.call.id)
        }
    }    

    function mute(){
        if(props.call.muted === true){
            adion.call.unmute(props.call.id)
        } else{
            adion.call.mute(props.call.id)
        }
    }

    function record(){        
        if(props.call.recorded === true){
            adion.call.stopRecording(props.call.id)
        } else{
            adion.call.startRecording(props.call.id)
        }
    }

    function hangup(){
        adion.call.hangup(props.call.id)
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
