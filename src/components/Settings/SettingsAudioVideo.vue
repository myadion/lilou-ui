<template>
  <v-container>
    <v-form>

      <v-row>
        <v-col cols="12">
          <h3>Gestion des périphériques</h3>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select rounded class="rounded-pill"  density="compact" variant="solo" :items="computedMediaDevicesAudioIn" label="Microphone" v-model="adion.setting.selectedAudioIn"></v-select>
          <div class="ga-5 d-flex align-center">
              <v-slider hide-details v-model="adion.setting.volumeIn"></v-slider>
              <span>{{ Math.round(adion.setting.volumeIn) }}%</span>
              <v-icon @click="adion.setting.volumeOut = 0" v-if="adion.setting.volumeIn >= 1">mdi-volume-high</v-icon>
              <v-icon @click="adion.setting.volumeIn = 100" v-if="adion.setting.volumeIn == 0">mdi-volume-off</v-icon>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select rounded class="rounded-pill" density="compact" variant="solo" :items="computedMediaDevicesAudioOut" label="Haut-parleur" thumbs-label v-model="adion.setting.selectedAudioOut"></v-select>
          <div class="ga-5 d-flex align-center">
              <v-slider hide-details v-model="adion.setting.volumeOut"></v-slider>
              <span>{{ Math.round(adion.setting.volumeOut) }}%</span>
              <v-icon @click="adion.setting.volumeOut = 0" v-if="adion.setting.volumeOut >= 1">mdi-volume-high</v-icon>
              <v-icon @click="adion.setting.volumeOut = 100" v-if="adion.setting.volumeOut == 0">mdi-volume-off</v-icon>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select rounded class="rounded-pill" density="compact" variant="solo" :items="computedMediaDevicesAudioOut" label="Sonnerie" thumbs-label v-model="adion.setting.selectedAudioRinger"></v-select>
          <div class="ga-5 d-flex align-center">
              <v-slider hide-details v-model="adion.setting.volumeRinger"></v-slider>
              <span>{{ Math.round(adion.setting.volumeRinger) }}%</span>
              <v-icon @click="adion.setting.volumeRinger = 0" v-if="adion.setting.volumeRinger >= 1">mdi-volume-high</v-icon>
              <v-icon @click="adion.setting.volumeRinger = 100" v-if="adion.setting.volumeRinger == 0">mdi-volume-off</v-icon>
          </div>
        </v-col>

        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>

        <v-col cols="12">
          <h3>Sonnerie</h3>
        </v-col>

      </v-row>
    </v-form>
  </v-container>

    <!-- <pre>{{ adion.setting.mediaDevices }}</pre> -->
</template>


<script setup>
import { ref, computed } from 'vue'
import { useAdion } from '@/adion';

const adion = useAdion()

const computedMediaDevicesAudioIn = computed(() => {
  return adion.setting.mediaDevices.audio.in.map((item) => {
    return {
      value: item.deviceId,
      title: item.label
    }
  })
})

const computedMediaDevicesAudioOut = computed(() => {
  return adion.setting.mediaDevices.audio.out.map((item) => {
    return {
      value: item.deviceId,
      title: item.label
    }
  })
})
</script>
