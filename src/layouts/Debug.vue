<template>
    <div class="debug">
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-title>CallStore > active</v-card-title>
                    <v-card-text>
                        <pre>{{ adion.call.call.active }}</pre>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title>WebRTCStore > sessions</v-card-title>
                    <v-card-text>
                        <pre>{{ adion.webrtc.webrtc.sessions }}</pre>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title>WebsocketStore</v-card-title>
                    <v-card-text>
                        <pre>{{ adion.ws.websocket }}</pre>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
    import { useAdion } from '@/Adion'
    const adion = useAdion()
</script>

<style scoped>
    .debug {
        background-color: #171717e3;
        color: #fff;
        padding: 10px;
        overflow: auto;
        font-size: 14px;
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 380px;
        left: 55px;
        bottom: 0;
    }
</style>