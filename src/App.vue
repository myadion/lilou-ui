<template>
  <notifications position="bottom right" />
  <Permission v-if="!adion.navigator.permissionsGranted && adion.navigator.permissionsGranted !== null" />
  <Default v-if="adion.connected && adion.navigator.permissionsGranted" />
  <Auth v-if="!adion.connected && adion.navigator.permissionsGranted" />
  <Debug v-if="debug" />
</template>

  <script setup>
  import { ref } from 'vue';
  import Default from '@/layouts/Default.vue';
  import Auth from '@/layouts/Auth.vue';
  import Permission from '@/layouts/Permission.vue';
  import Debug from '@/layouts/Debug.vue';
  import { useAdion } from '@/Adion';

  const adion = useAdion();

  const debug = ref(false);

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      adion.finder = true
    }
    
    if (e.key === 'F12') {
      e.preventDefault();
      debug.value = !debug.value;
      adion.info(debug.value ? 'Activé' : 'Désactivé', 'Mode développeur')
    }
  });

</script>
