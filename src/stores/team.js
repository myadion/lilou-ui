import { onMounted, onUnmounted, ref, reactive } from 'vue'

import { defineStore } from 'pinia'
import { useNotifyService } from '@/stores/notify'

import { useAdionService, useWebSocket } from '@/stores/adion'

export const useTeamStore = defineStore('useTeamStore', () => {

  onMounted(() => {
      useWebSocket.on('websocket-message', handleWebSocketMessage);
  });

  onUnmounted(() => {
      useWebSocket.off('websocket-message', handleWebSocketMessage);
  });

  // Adion
  const adion = useAdionService()

  // Notify
  const notify = useNotifyService()

  // Members
  const members = ref([])

  // Me
  const me = reactive({})

  async function init(){
    members.value = await adion.get('/users');

    Object.assign(me, members.value.find(member => member.uuid === adion.user.uuid));
  }

  function reset(){
    members.value = []
    return true
  }

  function handleWebSocketMessage(message) {
    switch(message.event){
      case 'chatd_presence_updated':
        updatePresence(message.data)
      break
    }
  }
  
  function updatePresence(user) {
    const index = members.value.findIndex(member => member.uuid === user.uuid);
    if (index !== -1) {
      members.value[index] = { ...members.value[index], ...user };
    }

    if(user.uuid === adion.user.uuid){
      Object.assign(me, user);
    }
  }
  
  return { 
      init,
      reset,
      me,
      members
  }
})
export default useTeamStore;
