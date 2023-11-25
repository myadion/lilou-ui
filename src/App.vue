<script setup>
import Default from '@/layouts/Default.vue';
import Auth from '@/layouts/Auth.vue';

import useAdionService from '@/stores/adion'
import { ref, watch, onMounted } from 'vue'

const adion = useAdionService()
const connected = ref(null)

adion.init().then(() => {
  connected.value = adion.user.is_connected;
})

watch(() => adion.user.is_connected, (newValue) => {
  connected.value = newValue;
});

</script>

<template>
  <notifications position="bottom right" />

  <div v-if="connected === null" class="d-flex align-center justify-center" style="height: 100vh; margin:0;background: url('auth_background.png') center/cover no-repeat;">
      <v-progress-circular indeterminate color="blue" :width="3" :size="64"></v-progress-circular>
  </div>

  <Default v-if="connected === true" />

  <Auth v-if="connected === false" />

</template>
