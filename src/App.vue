<template>
  <notifications position="bottom right" />

  <div v-if="connected === null" class="d-flex align-center justify-center"
    style="height: 100vh; margin:0;background: url('auth_background.png') center/cover no-repeat;">
    <v-progress-circular indeterminate color="blue" :width="3" :size="64"></v-progress-circular>
  </div>

  <Default v-if="!needPermission && connected === true" />

  <Auth v-if="!needPermission && connected === false" />

  <Permission v-if="needPermission" @reload="checkAndRequestPermissions" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Default from '@/layouts/Default.vue';
import Auth from '@/layouts/Auth.vue';
import Permission from '@/layouts/Permission.vue';
import useAdionService from '@/stores/adion';

const adion = useAdionService();
const connected = ref(null);
const needPermission = ref(false);

adion.init().then(() => {
  connected.value = adion.user.is_connected;
});

watch(() => adion.user.is_connected, (newValue) => {
  connected.value = newValue;
});

onMounted(() => {
  // checkAndRequestPermissions();
});

async function checkAndRequestPermissions() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    await requestNotificationPermission();
    await requestLocationPermission();
    await requestClipboardPermission();
    // Ajouter ici les demandes pour les autorisations optionnelles si nécessaire

    needPermission.value = false;
  } catch (error) {
    console.error(error);
    needPermission.value = true;
  }
}

async function requestNotificationPermission() {
  // Votre logique existante pour les notifications
}

function requestLocationPermission() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function requestClipboardPermission() {
  try {
    await navigator.clipboard.readText();
    // Ou utiliser navigator.clipboard.writeText si vous avez besoin d'écrire dans le presse-papiers
  } catch (error) {
    throw new Error('Accès au presse-papiers refusé');
  }
}

// Ajoutez ici des fonctions pour demander des autorisations optionnelles
</script>
