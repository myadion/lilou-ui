<script setup>
  import Default from '@/layouts/Default.vue';
  import Auth from '@/layouts/Auth.vue';
  import useWazoService from '@/stores/wazo'
  import { ref, watch } from 'vue'

  const wazo = useWazoService()
  const connected = ref(false)

  wazo.init()
  keep_alive()

  function keep_alive() {
    connected.value = wazo.session.token !== undefined
    setTimeout(() => {
      keep_alive()
    }, 1000)
  }

</script>

<template>
  <Default v-if="connected"/>
  <Auth v-else />
</template>
