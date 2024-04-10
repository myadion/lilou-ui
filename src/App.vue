<template>
  <notifications position="bottom right" />
  <Permission v-if="!$adion.navigator.permissionsGranted && $adion.navigator.permissionsGranted !== null" />
  <Default v-if="$adion.connected && $adion.navigator.permissionsGranted" />
  <Auth v-if="!$adion.connected && $adion.navigator.permissionsGranted" />
</template>

  <script setup>
  import Default from '@/layouts/Default.vue';
  import Auth from '@/layouts/Auth.vue';
  import Permission from '@/layouts/Permission.vue';
</script>
