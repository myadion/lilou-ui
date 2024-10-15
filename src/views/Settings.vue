<template>
  <div>
    <h1 class="mb-5">Paramètres</h1>

    <v-tabs v-model="tab" vertical>
        <v-tab value="audio">Audio / Vidéo</v-tab>
        <v-tab value="callForwarding">Renvoi d'appel</v-tab>
    </v-tabs>
    
    <v-window v-model="tab">
        <v-window-item value="audio">
            <v-card flat>
                <v-card-text>
                    <SettingsAudioVideo />
                </v-card-text>
            </v-card>
        </v-window-item>

        <v-window-item value="callForwarding">
            <v-card flat>
                <v-card-text>
                    <SettingsCallForwarding />
                </v-card-text>
            </v-card>
        </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('audio')
</script>